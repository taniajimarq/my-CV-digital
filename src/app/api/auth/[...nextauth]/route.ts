import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';

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
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Credenciales inválidas');
				}

				const userFound = await prisma.user.findUnique({
					where: { email: credentials.email },
				});
				if (!userFound) {
					throw new Error('Usuario no encontrado');
				}

				const matchPassword = await bcrypt.compare(
					credentials.password,
					userFound.password,
				);
				if (!matchPassword) {
					throw new Error('Contraseña incorrecta');
				}

				return {
					id: userFound.id.toString(),
					name: userFound.username,
					email: userFound.email,
				};
			},
		}),
	],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
