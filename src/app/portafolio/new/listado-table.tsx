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
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ProjectForm } from './project-form';
import Image from 'next/image';

export const ListadoTable = () => {
	const {
		projectsAll,
		show,
		setShow,
		handleShow,
		form,
		onSubmit,
		handleRemoveProject,
		consultarUno,
		idProject,
	} = Listado();

	return (
		<>
			<div className='p-10'>
				<AlertDialog open={show} onOpenChange={handleShow}>
					<AlertDialogTrigger asChild>
						<div className='flex sm:flex-row sm:justify-between justify-start flex-col'>
							<span className='text-indigo-900 text-lg text-center mb-5 sm:text-2xl font-bold'>
								Listado de proyectos
							</span>
							<Button onClick={() => setShow(true)}>
								Agregar nuevo
							</Button>
						</div>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogDescription className='hidden' />
						<div>
							<AlertDialogHeader>
								<AlertDialogTitle className='flex justify-end'>
									<AlertDialogCancel>
										<IoClose />
									</AlertDialogCancel>
								</AlertDialogTitle>
								<ProjectForm
									form={form}
									onSubmit={onSubmit}
									idProject={idProject}
								/>
							</AlertDialogHeader>
						</div>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<Table className=''>
				<TableHeader>
					<TableRow className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<TableHead className='w-1/6'>Título</TableHead>
						<TableHead className='w-1/6'>Imagen</TableHead>
						<TableHead className='w-1/6'>Sub título</TableHead>
						<TableHead className='w-2/6'>Descripción</TableHead>
						<TableHead className='w-1/12'>Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{projectsAll.map(projectAll => (
						<TableRow key={projectAll.id}>
							<TableCell>{projectAll.title}</TableCell>
							<TableCell>
								<Image
									src={
										projectAll.image &&
										projectAll.image.trim() !== ''
											? projectAll.image
											: '/assets/sin_imagen.png'
									}
									alt={
										projectAll.title ||
										'Imagen no disponible'
									}
									width={200}
									height={200}
									className='w-24 h-24'
								/>
							</TableCell>
							<TableCell>{projectAll.subTitle}</TableCell>
							<TableCell>{projectAll.description}</TableCell>
							<TableCell className='flex  space-x-7 items-center mt-5'>
								<IoTrashOutline
									type='button'
									onClick={e => {
										e.stopPropagation();
										handleRemoveProject(projectAll.id);
									}}
									className='h-6 w-6 text-gray-500 cursor-pointer'
								/>
								<IoPencil
									type='button'
									onClick={e => {
										e.stopPropagation();
										setShow(true);
										consultarUno(projectAll.id);
									}}
									className='h-6 w-6 text-gray-500 cursor-pointer'
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};
