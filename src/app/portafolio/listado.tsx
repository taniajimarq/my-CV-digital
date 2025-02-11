import { useEffect, useState } from 'react';
import api from '@/services/api';
import axios from 'axios';
import { ProjectPayload } from '@/app/api/projects/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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

const getFormSchema = () =>
	z.object({
		description: z.string().min(2, {
			message: 'Este campo es requerido',
		}),
		image: z.string().optional(),
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

//TODO:Aqui va la logica
export function Listado() {
	const [idProject, setIdProject] = useState(0);
	const FormSchema = getFormSchema();
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			description: '',
			image: undefined,
			subTitle: '',
			title: '',
			url: '',
		},
	});
	const [show, setShow] = useState(false);
	const handleShow = () => {
		setShow(!show);
		resetForm();
	};

	const resetForm = () => {
		setIdProject(0);
		form.reset({
			description: '',
			image: undefined,
			subTitle: '',
			title: '',
			url: '',
		});
	};

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await handleSubmit(data);
	}
	const handleSubmit = async (body: Partial<ProjectPayload>) => {
		console.log(body);
		try {
			if (idProject) {
				// Editar proyecto
				await api.put<ProjectPayload>(`/projects/${idProject}`, body);
			} else {
				// Crear proyecto
				await api.post<ProjectPayload>('/projects', body);
			}

			setShow(false);
			resetForm();
			await getAllProject();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error(
					'Error en Axios:',
					error.response?.status,
					error.response?.data || error.message,
				);
			} else {
				console.error('Error desconocido:', error);
			}
		}
	};

	const consultarUno = async (id: number) => {
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
	const { data, status } = useSession();

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
		data,
		signOut,
		signIn,
		router,
		status,
		getAllProject,
	};
}
