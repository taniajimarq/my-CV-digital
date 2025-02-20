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
		projectsAll, //Trae todos los proyectos
		setShow, //Mostrar el modal
		handleRemoveProject, //Eliminar proyectos
		consultarUno, //Consulta un proyecto con respecto a su id
		show, //Mostrar el modal
		handleShow, //Manejar el estado del modal
		form, //Datos del formulario
		onSubmit, //Envía datos del formulario
		idProject, //Id del proyecto
		loading,
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
			{loading ? (
				<>
					<div className='w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700'>
						<div className='flex items-center justify-between'>
							<div>
								<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
								<div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
							</div>
							<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
						</div>
						<div className='flex items-center justify-between pt-4'>
							<div>
								<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
								<div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
							</div>
							<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
						</div>
						<div className='flex items-center justify-between pt-4'>
							<div>
								<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
								<div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
							</div>
							<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
						</div>
						<div className='flex items-center justify-between pt-4'>
							<div>
								<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
								<div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
							</div>
							<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
						</div>
						<div className='flex items-center justify-between pt-4'>
							<div>
								<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5'></div>
								<div className='w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
							</div>
							<div className='h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12'></div>
						</div>
						<span className='sr-only'>Loading...</span>
					</div>
				</>
			) : (
				<Table>
					<TableHeader>
						{/*Encabezados de la tabla */}
						<TableRow className='text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<TableHead className='w-1/6'>Título</TableHead>
							<TableHead className='w-1/6'>Imagen</TableHead>
							<TableHead className='w-1/6'>Sub título</TableHead>
							<TableHead className='w-2/6'>Descripción</TableHead>
							<TableHead className='w-1/12'>Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{/*Mapea los proyectos para mostrarlos en la tabla sin escribir uno por uno, componente reutilizable */}
						{projectsAll.length > 0 ? (
							projectsAll.map(projectAll => (
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
									<TableCell>
										{projectAll.description}
									</TableCell>
									<TableCell className='flex  space-x-7 items-center mt-5'>
										{/*Botón Eliminar el proyecto */}
										<IoTrashOutline
											type='button'
											onClick={e => {
												e.stopPropagation();
												handleRemoveProject(
													projectAll.id,
												);
											}}
											className='h-6 w-6 text-gray-500 cursor-pointer'
										/>
										{/*Botón Editar proyecto */}
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
							))
						) : (
							<>
								<TableRow className='bg-slate-300'>
									<TableCell
										colSpan={5}
										className='text-center py-4'
									>
										<h1 className='text-xl text-slate-700'>
											Datos no encontrados
										</h1>
									</TableCell>
								</TableRow>
							</>
						)}
					</TableBody>
				</Table>
			)}
		</>
	);
};
