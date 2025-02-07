import { useEffect, useState } from 'react';
import api from '@/services/api';
import axios from 'axios';
import { ProjectPayload } from '@/app/api/projects/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface ProjectsResponse {
	id: number;
	title: string;
	subTitle: string;
	description: string;
	image: string;
	url: string;
	createdAt: string;
	updatedAt: string;
}

//TODO:Aqui va la logica
export function Listado() {
	const FormSchema = z.object({
		description: z.string().min(2, {
			message: 'Este campo es requerido',
		}),
		image: z.string().min(2, {
			message: 'Este campo es requerido',
		}),
		subTitle: z.string().min(2, {
			message: 'Este campo es requerido',
		}),
		title: z.string().min(2, {
			message: 'Este campo es requerido',
		}),
		url: z.string().min(2, {
			message: 'Este campo es requerido',
		}),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			description: '',
			image: '',
			subTitle: '',
			title: '',
			url: '',
		},
	});
	const [show, setShow] = useState(false);
	const handleShow = () => {
		setShow(!show);
	};
	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await handleSubmit(data);
	}
	const handleSubmit = async (body: ProjectPayload) => {
		try {
			if (idProject) {
				// 🔹 Esperar la actualización antes de continuar
				await projectUpdate(idProject, body);
			} else {
				// 🔹 Crear nuevo proyecto
				await api.put<ProjectPayload>('/projects', body);
			}

			// 🔹 Cerrar el modal después de la edición o creación
			setShow(false);

			// 🔹 Resetear el formulario después de completar la acción
			form.reset({
				description: '',
				image: '',
				subTitle: '',
				title: '',
				url: '',
			});

			// 🔹 Refrescar la lista de proyectos
			await getAllProject();
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
	/* 	const handleSubmit = async (body: ProjectPayload) => {
		const { data } = await api.post<ProjectPayload>('/projects', body);
		if (idProject) {
			await projectUpdate(idProject, body);
		} else {
			try {
				setShow(false);
				console.log(data);
				//ver manera de resetear los campos
				form.reset({
					description: '',
					image: '',
					subTitle: '',
					title: '',
					url: '',
				});
				await getAllProject();
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
		}
	}; */

	const [idProject, setIdProject] = useState(0);

	const consultarUno = async (id: number) => {
		console.log('Consulta');
		try {
			const { data } = await api.get<ProjectsResponse>(`/projects/${id}`);
			setIdProject(data.id);
			form.setValue('description', data.description);
			form.setValue('subTitle', data.subTitle);
			form.setValue('title', data.title);
			form.setValue('url', data.url);
		} catch (error) {
			console.log('Error', error);
		}
	};

	const projectUpdate = async (id: number, body: ProjectPayload) => {
		try {
			const { data } = await api.put<ProjectsResponse>(
				`/projects/${id}`,
				body,
			);
			return data;
		} catch (error) {
			console.log('Error', error);
		}
	};

	const handleRemoveProject = async (id: number) => {
		try {
			await api.delete(`/projects/${id}`);
			// router.refresh();
			await getAllProject();
		} catch (error) {
			console.error('Error al eliminar el proyecto:', error);
		}
	};

	const getAllProject = async () => {
		try {
			const { data } = await api.get<ProjectsResponse[]>('/projects');
			setProjectsAll(data);
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

	const [projectsAll, setProjectsAll] = useState<ProjectsResponse[]>([]);

	useEffect(() => {
		getAllProject();
	}, []);

	return {
		form,
		handleSubmit,
		onSubmit,
		projectsAll,
		show,
		setShow,
		handleShow,
		handleRemoveProject,
		consultarUno,
		idProject,
	};
}
