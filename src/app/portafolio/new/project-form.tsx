'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface Props {
	form: UseFormReturn<{
		title: string;
		subTitle: string;
		description: string;
		url: string;
		image?: string | undefined;
	}>;
	onSubmit: (data: {
		title: string;
		subTitle: string;
		description: string;
		url: string;
		image?: string | undefined;
	}) => Promise<void>;
	idProject: number;
}

export const ProjectForm = ({ form, onSubmit, idProject }: Props) => {
	return (
		<>
			<Form {...form}>
				<div>
					<p className='text-center text-[#5D83A0] md:text-2xl font-bold'>
						{idProject !== 0 ? 'Editar proyecto' : 'Nuevo proyecto'}
					</p>
				</div>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Título</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
										placeholder='Nombre del proyecto'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='subTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sub título</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
										placeholder='Sub título del proyecto'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descripción</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
										placeholder='Ingresa una descripción'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='image'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Imagen</FormLabel>
								<FormControl>
									<Input
										className='mt-2 md:mt-3 mb-3 md:mb-5 border text-gray-500 border-gray-300 rounded-md px-3 md:px-4 py-2'
										placeholder='Seleccióna una imagen'
										type='file'
										accept='image/*'
										onChange={e => {
											const file = e.target.files?.[0];
											if (file) {
												const reader = new FileReader();
												reader.onloadend = () => {
													field.onChange(
														reader.result as string,
													);
												};
												reader.readAsDataURL(file);
											}
										}}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='url'
						render={({ field }) => (
							<FormItem>
								<FormLabel>URL del proyecto</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='mt-2 md:mt-3 mb-3 md:mb-5 border border-gray-300 rounded-md px-3 md:px-4 py-2'
										placeholder='URL'
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-center mt-5 md:mt-8'>
						<Button
							type='submit'
							className='text-white bg-gray-900 hover:bg-gray-400 px-4 md:px-6 py-2 rounded-md w-[150px] md:w-[200px]'
						>
							{idProject !== 0
								? 'Editar proyecto'
								: 'Guardar proyecto'}
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
