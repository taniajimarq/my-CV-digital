import { UseFormReturn } from 'react-hook-form';
import { SweetAlertIcon } from 'sweetalert2';
{
	/**Interfaz de proyectos */
}
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
{
	/**Interfaz de formulario proyectos */
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
{
	/**Interfaz de Alertas SweetAlert2 */
}

export interface Display_Alert_Interface {
	success?: boolean;
	msg?: string;
	errors?: string[];
	props_alert?: object;
	icon?: SweetAlertIcon | undefined;
}
