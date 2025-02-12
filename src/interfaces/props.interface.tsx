import { UseFormReturn } from 'react-hook-form';

export interface PropsProyects {
	show: boolean;
	setShow: (value: boolean) => void;
	handleShow: () => void;
	form: UseFormReturn<{
		title: string;
		subTitle: string;
		description: string;
		url: string;
		image?: string | undefined;
	}>;
	onSubmit: (data: {
		title: string;
		subTitle: string;
		description: string;
		url: string;
		image?: string | undefined;
	}) => Promise<void>;
	idProject: number;
}
export interface PropsForm {
	form: UseFormReturn<{
		title: string;
		subTitle: string;
		description: string;
		url: string;
		image?: string | undefined;
	}>;
	onSubmit: (data: {
		title: string;
		subTitle: string;
		description: string;
		url: string;
		image?: string | undefined;
	}) => Promise<void>;
	idProject: number;
}
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
