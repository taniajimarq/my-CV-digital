import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

//Interfaz de proyecto
export interface ProjectPayload {
	title: string;
	subTitle: string;
	description: string;
	image: string;
	url: string;
}
/* Crear nuevo proyecto en la base de datos*/
export async function POST(request: NextRequest) {
	const body: ProjectPayload = await request.json();
	try {
		await prisma.projects.create({
			data: body,
		});

		return NextResponse.json(
			{ msg: 'Projecto creado correctamente' },
			{
				status: 201, //
			},
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: 'Algo salio mal...' }, { status: 400 });
	}
}

/* Obtiene la lista de proyectos ordenados por ID en orden descendente */
export async function GET() {
	try {
		const projects = await prisma.projects.findMany({
			orderBy: { id: 'desc' },
		});

		if (!projects) {
			return NextResponse.json(
				{ error: 'Proyecto no encontrado' },
				{ status: 404 },
			);
		}

		return NextResponse.json(projects);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return NextResponse.json(
			{ error: 'Error al obtener el proyecto' },
			{ status: 500 },
		);
	}
}
