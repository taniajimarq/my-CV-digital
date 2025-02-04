'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const ProyectForm = () => {
	return (
		<>
			<form className='p-3 md:p-5' /* onSubmit={onSubmit} */>
				<Label className='text-secondary font-medium'>Nombre</Label>
				<Input
					className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
					placeholder='Nombre del producto'
					/* {...register('name')} */
				/>
				<Label className='text-secondary font-medium'>
					Descripción
				</Label>
				<Input
					className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
					placeholder='Ingresa una descripción'
					/* {...register('description')} */
				/>
				<Label className='text-secondary font-medium'>Precio</Label>
				<Input
					className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
					placeholder='Ingresa el precio'
					/* {...register('price', {
						valueAsNumber: true,
						required: true,
					})} */
				/>
				<Label className='text-secondary font-medium'>Imagen</Label>
				<Input
					className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
					placeholder='Seleccióna una imagen'
					/* {...register('image')} */
				/>
				<div className='flex justify-center mt-5 md:mt-8'>
					<Button className='text-white bg-btnSecondary hover:bg-gray-400 px-4 md:px-6 py-2 rounded-md w-[150px] md:w-[200px]'>
						{/* {product?.id ? 'Editar producto' : 'Guardar producto'} */}
					</Button>
				</div>
			</form>
		</>
	);
};
