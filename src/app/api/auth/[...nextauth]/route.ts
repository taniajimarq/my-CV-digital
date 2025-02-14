import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import { sendVerificationCode } from '../../../../../utils/mailer';

export const authOptions = {
	providers: [
		//Providers de NextAuth para GitHub y Credentials
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
			//Entrar con credenciales
			async authorize(credentials) {
				try {
					//Verificar si hay correo y contraseña válidos
					if (!credentials?.email || !credentials?.password) {
						throw new Error('No hay credenciales');
					}
					const user = await prisma.user.findUnique({
						where: { email: credentials.email },
					});

					if (!user) {
						throw new Error('Credenciales incorrectas');
					}
					//Revisar que coincida la contraseña
					const matchPassword = await bcrypt.compare(
						credentials.password,
						user.password,
					);
					if (!matchPassword) {
						throw new Error('Contraseña incorrecta');
					}
					//Mandar código a gmail
					if (credentials.code === '') {
						const generatedCode = Math.floor(
							100000 + Math.random() * 900000,
						).toString();

						// Guardar el código en la base de datos
						await prisma.user.update({
							where: { email: credentials.email },
							data: { verificationCode: generatedCode },
						});

						// Enviar el código al email del usuario
						await sendVerificationCode(user.email, generatedCode);

						throw new Error(
							'Código enviado a tu correo. Verifícalo antes de continuar.',
						);
					}

					// Verificar código ingresado
					if (credentials.code !== user.verificationCode) {
						throw new Error('Código de verificación incorrecto.');
					}

					// Limpiar el código después de validarlo
					await prisma.user.update({
						where: { email: credentials.email },
						data: { verificationCode: null },
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
