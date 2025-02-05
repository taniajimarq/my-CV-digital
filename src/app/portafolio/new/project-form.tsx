'use client';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectPayload } from '@/app/api/projects/route';
import api from '@/services/api';
import axios from 'axios';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Listado } from '../listado';
import { IoPencil, IoTrashOutline } from 'react-icons/io5';

export const ProjectForm = () => {
	const { projectsAll } = Listado();

	const [body, setBody] = useState<ProjectPayload>({
		description: '',
		image: '',
		subTitle: '',
		title: '',
		url: '',
	});

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBody({ ...body, image: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (body: ProjectPayload) => {
		try {
			const { data } = await api.post<ProjectPayload>('/projects', body);
			console.log(data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(
					'Error en Axios:',
					error.response?.data || error.message,
				);
			} else {
				console.error('Error desconocido:', error);
			}
		}
	};

	return (
		<>
			<div className='p-10'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-1/5'>Título</TableHead>
							<TableHead className='w-1/5'>Sub título</TableHead>
							<TableHead className='w-2/5'>Descripción</TableHead>
							<TableHead className='w-1/5'>Acciónes</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{projectsAll.map(projectsAll => (
							<TableRow key={projectsAll.id}>
								<TableCell>{projectsAll.title}</TableCell>
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
			</div>

			{/* Contenido principal formulario para crear proyectos */}
			<div className='flex flex-col h-screen bg-white overflow-hidden'>
				<div className='flex flex-col md:flex-row flex-grow sm:justify-center max-[576px]:min-[360px]:justify-center'>
					{/* Formulario */}
					<div className='flex flex-col justify-center items-center w-full md:w-1/2 p-4 md:px-8 lg:px-12'>
						<Card className='w-full md:w-[750px]'>
							<CardHeader>
								<CardTitle>
									<p className='text-center text-[#5D83A0] text-3xl md:text-3xl font-bold mt-8'>
										Nuevo proyecto
									</p>
								</CardTitle>
							</CardHeader>
							<CardContent>
								{/* <form
									className='p-3 md:p-5' onSubmit={onSubmit} 
								> */}
								<Label className='text-slate-600 font-medium'>
									Título
								</Label>
								<Input
									className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
									placeholder='Nombre del proyecto'
									value={body.title}
									onChange={({ target }) =>
										setBody({
											...body,
											title: target.value,
										})
									}
									/* {...register('title')} */
								/>
								<Label className='text-slate-600 font-medium'>
									Sub título
								</Label>
								<Input
									className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
									placeholder='Sub título del proyecto'
									value={body.subTitle}
									onChange={({ target }) =>
										setBody({
											...body,
											subTitle: target.value,
										})
									}
									/* {...register('subTitle')} */
								/>
								<Label className='text-slate-600 font-medium'>
									Descripción
								</Label>
								<Input
									className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
									placeholder='Ingresa una descripción'
									value={body.description}
									onChange={({ target }) =>
										setBody({
											...body,
											description: target.value,
										})
									}
									/* {...register('description')} */
								/>
								<Label className='text-slate-600 font-medium'>
									Imagen
								</Label>
								<Input
									/* className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2' */
									placeholder='Seleccióna una imagen'
									type='file'
									accept='image/*'
									onChange={handleImageUpload}
									/* {...register('image')} */
								/>
								<Label className='text-slate-600 font-medium'>
									URL Behance
								</Label>
								<Input
									className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
									placeholder='URL del proyecto'
									value={body.url}
									onChange={({ target }) =>
										setBody({
											...body,
											url: target.value,
										})
									}
									/* {...register('url')} */
								/>
								<div className='flex justify-center mt-5 md:mt-8'>
									<Button
										onClick={() => handleSubmit(body)}
										className='text-white bg-gray-900 hover:bg-gray-400 px-4 md:px-6 py-2 rounded-md w-[150px] md:w-[200px]'
									>
										Guardar
										{/* {product?.id ? 'Editar producto' : 'Guardar producto'} */}
									</Button>
								</div>
								{/* </form> */}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
};
