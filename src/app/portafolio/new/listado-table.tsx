'use client';
import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Listado } from '../listado';
import { IoClose, IoPencil, IoTrashOutline } from 'react-icons/io5';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ProjectForm } from './project-form';
import Image from 'next/image';

export const ListadoTable = () => {
	const { projectsAll } = Listado();

	return (
		<>
			<div className='p-10'>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<div className='flex sm:flex-row sm:justify-between justify-start flex-col'>
							<span className='text-indigo-900 text-lg text-center mb-5 sm:text-2xl font-bold'>
								Listado de proyectos
							</span>
							<Button>Agregar nuevo</Button>
						</div>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<div>
							<AlertDialogHeader>
								<AlertDialogTitle className='flex justify-end'>
									<AlertDialogCancel>
										<IoClose />
									</AlertDialogCancel>
								</AlertDialogTitle>
								<ProjectForm />
							</AlertDialogHeader>
						</div>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<Table>
				<TableHeader>
					<TableRow className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<TableHead className='w-1/6'>Título</TableHead>
						<TableHead className='w-1/6'>Imagen</TableHead>
						<TableHead className='w-1/6'>Sub título</TableHead>
						<TableHead className='w-2/6'>Descripción</TableHead>
						<TableHead className='w-1/6'>Acciónes</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{projectsAll.map(projectsAll => (
						<TableRow key={projectsAll.id}>
							<TableCell>{projectsAll.title}</TableCell>
							<TableCell>
								<Image
									src={
										projectsAll.image &&
										projectsAll.image.trim() !== ''
											? projectsAll.image
											: '/assets/sin_imagen.png'
									}
									alt={
										projectsAll.title ||
										'Imagen no disponible'
									}
									// src={'/assets/naturityClean.png'}
									width={200}
									height={200}
									// alt={''}
									className='w-24 h-24'
								/>
							</TableCell>
							<TableCell>{projectsAll.subTitle}</TableCell>
							<TableCell>{projectsAll.description}</TableCell>
							<TableCell className='flex space-x-7'>
								<IoTrashOutline className='h-6 w-6 text-gray-500 cursor-pointer' />
								<IoPencil className='h-6 w-6 text-gray-500 cursor-pointer' />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
