'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Listado } from '../listado';

export const ProjectForm = () => {
	const { handleSubmit, handleImageUpload, body, setBody } = Listado();

	return (
		<>
			{/* Contenido principal formulario para crear proyectos */}
			<div>
				<p className='text-center text-[#5D83A0] md:text-2xl font-bold'>
					Nuevo proyecto
				</p>
			</div>
			<div>
				{/* <form
									className='p-3 md:p-5' onSubmit={onSubmit} 
								> */}
				<Label className='text-slate-600 font-medium'>Título</Label>
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
				<Label className='text-slate-600 font-medium'>Sub título</Label>
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
				<Label className='text-slate-600 font-medium'>Imagen</Label>
				<Input
					className='mt-2 md:mt-3 mb-3 md:mb-5 border text-gray-500 border-gray-300 rounded-md px-3 md:px-4 py-2'
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
			</div>
		</>
	);
};
