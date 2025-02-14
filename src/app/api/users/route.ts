'use client';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

//Estructura de los datos para los usuarios
export interface UserPayload {
	email: string;
	username: string;
	password: string;
	code: string;
}

export async function POST(request: NextRequest) {
	try {
		const body: UserPayload = await request.json();
		if (!body.email || !body.password || !body.username) {
			return NextResponse.json(
				{ msg: 'Todos los campos son obligatorios' },
				{ status: 400 },
			);
		}
		// Verificar que no exista el usuario
		const existingUser = await prisma.user.findUnique({
			where: { email: body.email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ msg: 'El usuario ya existe' },
				{ status: 400 },
			);
		}

		// Encriptar la contraseña antes de guardarla
		const hashedPassword = await bcrypt.hash(body.password, 10);

		// Crear el usuario
		await prisma.user.create({
			data: {
				email: body.email,
				username: body.username,
				password: hashedPassword,
				verificationCode: body.code || '',
			},
		});

		return NextResponse.json(
			{ msg: 'Usuario creado correctamente' },
			{ status: 201 },
		);
	} catch (error) {
		console.error('Error al crear usuario: ', error);
		return NextResponse.json(
			{ msg: 'Error interno del servidor' },
			{ status: 500 },
		);
	}
}

/* Consultar usuario */
export async function GET() {
	try {
		const users = await prisma.user.findMany();

		if (!users.length) {
			return NextResponse.json(
				{ error: 'Usuario no encontrado' },
				{ status: 404 },
			);
		}

		return NextResponse.json(users);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: 'Error al obtener el usuario' },
			{ status: 500 },
		);
	}
}
