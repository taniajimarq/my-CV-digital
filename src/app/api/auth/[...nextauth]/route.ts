import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import { sendVerificationCode } from '../../../../../utils/mailer';

export const authOptions = {
	providers: [
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
			async authorize(credentials) {
				try {
					if (!credentials?.email || !credentials?.password) {
						throw new Error('No hay credenciales');
					}

					const userFound = await prisma.user.findUnique({
						where: { email: credentials.email },
					});
					if (!userFound) {
						throw new Error('Credenciales incorrectas');
					}

					const matchPassword = await bcrypt.compare(
						credentials.password,
						userFound.password,
					);
					if (!matchPassword) {
						throw new Error('Contraseña incorrecta');
					}

					if (credentials.code === '') {
						const generatedCode = Math.floor(
							100000 + Math.random() * 900000,
						).toString();

						// Guardar el código en la base de datos (puede ser en Redis o en un campo temporal del usuario)
						await prisma.user.update({
							where: { email: credentials.email },
							data: { verificationCode: generatedCode },
						});

						// Enviar el código al email del usuario
						await sendVerificationCode(
							userFound.email,
							generatedCode,
						);

						throw new Error(
							'Código enviado a tu correo. Verifícalo antes de continuar.',
						);
					}

					// Verificar código ingresado
					if (credentials.code !== userFound.verificationCode) {
						throw new Error('Código de verificación incorrecto.');
					}

					// Limpiar el código después de validarlo
					await prisma.user.update({
						where: { email: credentials.email },
						data: { verificationCode: null },
					});

					return {
						id: userFound.id.toString(),
						name: userFound.username,
						email: userFound.email,
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
