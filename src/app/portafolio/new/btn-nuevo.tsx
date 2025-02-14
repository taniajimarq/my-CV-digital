'use client';
import React from 'react';
import { IoClose } from 'react-icons/io5';
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
import { PropsProyects } from '@/interfaces';

export const ButtonNuevo = ({
	show, //Indica si el modal está abierto o cerrado.
	setShow, //Función para actualizar el estado del modal.
	handleShow, //Función que maneja el cambio de estado del modal.
	form, //Datos del formulario desde el Listado
	onSubmit, //Envío del formulario
	idProject, //ID del proyecto para edición
}: PropsProyects) => {
	return (
		<>
			<div className='flex flex-row justify-between pb-10'>
				<span className='text-indigo-900 text-lg text-center mb-5 sm:text-2xl font-bold'>
					Listado de proyectos
				</span>
				{/*Modal con formulario para agregar proyectos nuevos*/}
				<AlertDialog open={show} onOpenChange={handleShow}>
					<AlertDialogTrigger asChild>
						<div>
							<div className='flex sm:flex-row sm:justify-between justify-start flex-col'>
								{/*Botón que abre el modal */}
								<Button onClick={() => setShow(true)}>
									Agregar nuevo
								</Button>
							</div>
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
								{/*Formulario reutilizable, si existe id es para editar si no es para agregar nuevo */}
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
		</>
	);
};
