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
	show,
	setShow,
	handleShow,
	form,
	onSubmit,
	idProject,
}: PropsProyects) => {
	return (
		<>
			<div className='flex flex-row justify-between pb-10'>
				<span className='text-indigo-900 text-lg text-center mb-5 sm:text-2xl font-bold'>
					Listado de proyectos
				</span>
				<AlertDialog open={show} onOpenChange={handleShow}>
					<AlertDialogTrigger asChild>
						<div>
							<div className='flex sm:flex-row sm:justify-between justify-start flex-col'>
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
