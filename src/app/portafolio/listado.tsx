import { useEffect, useState } from 'react';
import api from '@/services/api';
import axios from 'axios';
import { ProjectPayload } from '@/app/api/projects/route';


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

export function Listado() {
	const [body, setBody] = useState<ProjectPayload>({
		description: '',
		image: '',
		subTitle: '',
		title: '',
		url: '',
	});

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
		setBody

	};
}
