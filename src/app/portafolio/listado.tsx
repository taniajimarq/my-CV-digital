import { useEffect, useState } from 'react';
import api from '@/services/api';
import axios from 'axios';

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
	};
}
