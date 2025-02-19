import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { sendVerificationCode } from '../../../../../utils/mailer';

export const authOptions: NextAuthOptions = {
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
						return Promise.reject(
							new Error(
								JSON.stringify({
									message: 'Credenciales incorrectas',
								}),
							),
						);
					}

					const user = await prisma.user.findUnique({
						where: { email: credentials.email },
					});

					if (!user) {
						return Promise.reject(
							new Error(
								JSON.stringify({
									message: 'Usuario no encontrado',
								}),
							),
						);
					}

					const now = new Date();
					if (
						user.blockedUntil &&
						new Date(user.blockedUntil) > now
					) {
						return Promise.reject(
							new Error(
								JSON.stringify({
									message: `Cuenta bloqueada. Intenta después de ${new Date(user.blockedUntil).toLocaleTimeString()}`,
								}),
							),
						);
					}

					const matchPassword = await bcrypt.compare(
						credentials.password,
						user.password,
					);

					if (!matchPassword) {
						return Promise.reject(
							new Error(
								JSON.stringify({
									message: 'Contraseña incorrecta',
								}),
							),
						);
					}

					if (credentials.code === '') {
						const generatedCode = Math.floor(
							100000 + Math.random() * 900000,
						).toString();

						await prisma.user.update({
							where: { email: credentials.email },
							data: {
								verificationCode: generatedCode,
								failedAttempts: 0,
								blockedUntil: null,
							},
						});

						await sendVerificationCode(user.email, generatedCode);

						// ✅ Enviar mensaje personalizado sin que NextAuth lo sobrescriba
						return Promise.reject(
							new Error(
								JSON.stringify({ message: 'Código enviado' }),
							),
						);
					}

					if (credentials.code !== user.verificationCode) {
						const failedAttempts = user.failedAttempts + 1;
						let blockedUntil = null;

						if (failedAttempts >= 3) {
							blockedUntil = new Date();
							blockedUntil.setMinutes(
								blockedUntil.getMinutes() + 5,
							);
						}

						await prisma.user.update({
							where: { email: credentials.email },
							data: { failedAttempts, blockedUntil },
						});

						return Promise.reject(
							new Error(
								JSON.stringify({
									message:
										failedAttempts >= 3
											? 'Demasiados intentos fallidos. Intenta más tarde.'
											: 'Código de verificación incorrecto.',
								}),
							),
						);
					}

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
				} catch (error) {
					if (error instanceof Error) {
						console.error('Error en autenticación:', error.message);
						return Promise.reject(
							new Error(
								JSON.stringify({ message: error.message }),
							),
						);
					}

					return Promise.reject(
						new Error(
							JSON.stringify({
								message: 'Ocurrió un error inesperado.',
							}),
						),
					);
				}
			},
		}),
	],
};
