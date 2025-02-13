import { useEffect, useState } from 'react';
import api from '@/services/api';
import axios from 'axios';
import { ProjectPayload } from '@/app/api/projects/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ProjectsResponse } from '@/interfaces';
import { useSwalAlert } from './useSwalAlert';

//TODO:Aqui va la logica
export function useCustomListado() {
	const [idProject, setIdProject] = useState(0);
	const [show, setShow] = useState(false);
	const { data, status } = useSession();
	const [projectsAll, setProjectsAll] = useState<ProjectsResponse[]>([]);

	const router = useRouter();
	const { display_alert } = useSwalAlert();

	const FormSchema = z.object({
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

	/* Abrir y cerrar modal */
	const handleShow = () => {
		setShow(!show);
		resetForm();
	};
	/* Resetear el formulario */
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
				display_alert({
					success: true,
					msg: 'Proyecto actualizado correctamente',
				});
			} else {
				// Crear proyecto
				await api.post<ProjectPayload>('/projects', body);
				display_alert({
					success: true,
					msg: 'Proyecto creado correctamente',
				});
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
				display_alert({
					success: false,
					msg: 'Error al guardar el proyecto',
					errors: axios.isAxiosError(error)
						? [error.response?.data || error.message]
						: ['Error desconocido'],
				});
				console.error('Error en la solicitud:', error);
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
			display_alert({
				success: true,
				msg: 'Proyecto eliminado correctamente',
			});
			// router.refresh();
			await getAllProject();
		} catch (error) {
			display_alert({
				success: false,
				msg: 'Error al eliminar el proyecto',
				errors: axios.isAxiosError(error)
					? [error.response?.data || error.message]
					: ['Error desconocido'],
			});
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
		signIn,
		router,
		status,
		getAllProject,
	};
}
