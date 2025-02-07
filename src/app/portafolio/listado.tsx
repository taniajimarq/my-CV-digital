import { useEffect, useState } from 'react';
import api from '@/services/api';
import axios from 'axios';
import { ProjectPayload } from '@/app/api/projects/route';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

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
	const [body, setBody] = useState<ProjectPayload>({
		description: '',
		image: '',
		subTitle: '',
		title: '',
		url: '',
	});

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

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
		});

		await handleSubmit(data);
	}

	const handleSubmit = async (body: ProjectPayload) => {
		try {
			const { data } = await api.post<ProjectPayload>('/projects', body);
			console.log(data);
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

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setBody({ ...body, image: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};

	const [projectsAll, setProjectsAll] = useState<ProjectsResponse[]>([]);

	useEffect(() => {
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

		getAllProject();
	}, []);

	return {
		projectsAll,
		handleSubmit,
		handleImageUpload,
		body,
		setBody,
		form,
		onSubmit,
	};
}
