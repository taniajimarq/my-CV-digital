import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface ProjectPayload {
	title: string;
	subTitle: string;
	description: string;
	image: string;
	url: string;
}

export async function POST(request: NextRequest) {
	const body: ProjectPayload = await request.json();
	try {
		await prisma.projects.create({
			data: body,
		});

		return NextResponse.json(
			{ msg: 'Projecto creado correctamente' },
			{
				status: 201,
			},
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: 'Algo salio mal...' }, { status: 400 });
	}
}
