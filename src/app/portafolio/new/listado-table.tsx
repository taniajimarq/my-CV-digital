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
import { useCustomListado } from '../useCustomListado';
import { IoPencil, IoTrashOutline } from 'react-icons/io5';
import Image from 'next/image';
import { ButtonNuevo } from './btn-nuevo';

export const ListadoTable = () => {
	const {
		projectsAll,
		setShow,
		handleRemoveProject,
		consultarUno,
		show,
		handleShow,
		form,
		onSubmit,
		idProject,
	} = useCustomListado();

	return (
		<>
			<ButtonNuevo
				form={form}
				handleShow={handleShow}
				show={show}
				onSubmit={onSubmit}
				idProject={idProject}
				setShow={setShow}
			/>

			<Table>
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
