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
import { IoPencil, IoTrashOutline } from 'react-icons/io5';

export const ListadoTable = () => {
	const { projectsAll} = Listado();

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
		</>
	);
};
