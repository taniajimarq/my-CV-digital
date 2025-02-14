import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { ProjectPayload } from '../route';

const prisma = new PrismaClient();

//Método para buscar productos a partir del ID único
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		if (!id)
			return NextResponse.json(
				{ error: 'El id es necesario' },
				{ status: 400 }, // Si no se proporciona un id
			);

		const projects = await prisma.projects.findUnique({
			where: { id: +id }, //Retorna el objeto del proyecto si se encuentra
		});

		if (!projects) {
			return NextResponse.json(
				{ error: 'Proyecto no encontrado' },
				{ status: 404 }, //Si no existe un proyecto con el id proporcionado
			);
		}

		return NextResponse.json(projects);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: 'Error al obtener el proyecto' },
			{ status: 500 }, //Si ocurre un error inesperado en el servidor
		);
	}
}
//Edición de proyectos existentes
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		if (!id)
			return NextResponse.json(
				{ error: 'ID is required' },
				{ status: 400 },
			);

		const body: Partial<ProjectPayload> = await request.json();

		const updatedProject = await prisma.projects.update({
			where: { id: Number(id) },
			data: body,
		});

		return NextResponse.json(updatedProject);
	} catch (error) {
		console.log('Error al actualizar el proyecto:', error);
		return NextResponse.json(
			{ error: 'Error al actualizar el proyecto' },
			{ status: 500 },
		);
	}
}
//Eliminar proyectos existentes
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		if (!id) {
			return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
		}

		// Verificar si el proyecto existe antes de eliminarlo
		const project = await prisma.projects.findUnique({
			where: { id: +id },
		});

		if (!project) {
			return NextResponse.json(
				{ error: 'Proyecto no encontrado' },
				{ status: 404 }, //No encuentra el proyecto
			);
		}

		// Eliminar el proyecto con respecto al ID
		await prisma.projects.delete({
			where: { id: +id },
		});

		return NextResponse.json({
			message: 'Proyecto eliminado correctamente',
		});
	} catch (error) {
		console.error('Error al eliminar el proyecto:', error);
		return NextResponse.json(
			{ error: 'Error al eliminar el proyecto' },
			{ status: 500 },
		);
	}
}
