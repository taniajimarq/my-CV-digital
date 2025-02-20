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

//Hook personalizado para la gestión de proyectos
//TODO:Aqui va la logica
export function useCustomListado() {
	const [idProject, setIdProject] = useState(0); // Estado para almacenar el ID del proyecto en edición
	const [show, setShow] = useState(false); // Estado para controlar la visibilidad del modal
	const { data, status } = useSession(); // Obtener datos de la sesión de NextAuth
	const [projectsAll, setProjectsAll] = useState<ProjectsResponse[]>([]); // Estado para almacenar todos los proyectos
	const router = useRouter(); //Cambiar de ruta
	const { display_alert } = useSwalAlert(); // Hook para mostrar alertas
	const [loading, setLoading] = useState<boolean>(true);

	//Esquema de validación para el formulario usando Zod
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

	// Configuración del formulario con React Hook Form y Zod
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
	/*Maneja el envío del formulario y la acción de crear o editar un proyecto. */
	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await handleSubmit(data);
	}
	/*Envía los datos para crear o editar  */
	const handleSubmit = async (body: Partial<ProjectPayload>) => {
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
			// Manejo de errores en la solicitud HTTP
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
	/**
	 * Obtiene un proyecto por ID para editarlo y rellena el formulario con sus datos.
	 * {number} id - ID del proyecto a consultar.
	 */
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
	/**
	 * Elimina un proyecto por ID.
	 * {number} id - ID del proyecto a eliminar.
	 */
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
	/**
	 * Obtiene todos los proyectos desde la API y los almacena en el estado.
	 */
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
		} finally {
			setLoading(false); // Cambia el estado de carga después de la petición
		}
	};
	// Llama a la función para obtener todos los proyectos al cargar el componente
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
		loading,
	};
}
