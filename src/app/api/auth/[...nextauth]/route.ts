import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import { sendVerificationCode } from '../../../../../utils/mailer';

export const authOptions = {
	providers: [
		// Providers de NextAuth para GitHub y Credentials
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'jsmith@example.com',
				},
				password: { label: 'Password', type: 'password' },
				code: { label: 'Código de verificación', type: 'text' },
			},
			// Entrar con credenciales
			async authorize(credentials) {
				try {
					// Verificar si hay correo y contraseña válidos
					if (!credentials?.email || !credentials?.password) {
						throw new Error('No hay credenciales');
					}

					const user = await prisma.user.findUnique({
						where: { email: credentials.email },
					});

					if (!user) {
						throw new Error('Credenciales incorrectas');
					}

					// Verificar si la cuenta está bloqueada
					const now = new Date();
					if (
						user.blockedUntil &&
						new Date(user.blockedUntil) > now
					) {
						throw new Error(
							`Cuenta bloqueada. Intenta después de ${new Date(user.blockedUntil).toLocaleTimeString()}`,
						);
					}

					// Revisar que coincida la contraseña
					const matchPassword = await bcrypt.compare(
						credentials.password,
						user.password,
					);

					if (!matchPassword) {
						throw new Error('Contraseña incorrecta');
					}

					// Mandar código a gmail si aún no lo ha ingresado
					if (credentials.code === '') {
						const generatedCode = Math.floor(
							100000 + Math.random() * 900000,
						).toString();

						// Guardar el código en la base de datos y resetear intentos fallidos
						await prisma.user.update({
							where: { email: credentials.email },
							data: {
								verificationCode: generatedCode,
								failedAttempts: 0,
								blockedUntil: null,
							},
						});

						// Enviar el código al email del usuario
						await sendVerificationCode(user.email, generatedCode);

						throw new Error(
							'Código enviado a tu correo. Verifícalo antes de continuar.',
						);
					}

					// Validar código ingresado
					if (credentials.code !== user.verificationCode) {
						const failedAttempts = user.failedAttempts + 1;
						let blockedUntil = null;

						// Si supera el límite de intentos fallidos, bloquear cuenta por 5 minutos
						if (failedAttempts >= 3) {
							blockedUntil = new Date();
							blockedUntil.setMinutes(
								blockedUntil.getMinutes() + 5,
							);
						}

						// Actualizar intentos fallidos y posible bloqueo
						await prisma.user.update({
							where: { email: credentials.email },
							data: { failedAttempts, blockedUntil },
						});

						throw new Error(
							failedAttempts >= 3
								? 'Demasiados intentos fallidos. Intenta más tarde.'
								: 'Código de verificación incorrecto.',
						);
					}

					// Limpiar el código después de validarlo y resetear intentos fallidos
					await prisma.user.update({
						where: { email: credentials.email },
						data: {
							verificationCode: null,
							failedAttempts: 0,
							blockedUntil: null,
						},
					});

					return {
						id: user.id.toString(),
						name: user.username,
						email: user.email,
					};
				} catch (error: unknown) {
					if (error instanceof Error) {
						console.error(error.message);
						throw new Error(error.message);
					}

					throw new Error('Ocurrió un error inesperado.');
				}
			},
		}),
	],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
