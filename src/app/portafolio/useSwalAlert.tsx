import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Display_Alert_Interface } from '@/interfaces';

{
	/*Parametros para crear alertas con SweetAlert2 */
}
export const useSwalAlert = () => {
	const MySwal = withReactContent(Swal);

	const display_alert = ({
		success = false,
		msg = '',
		errors = [],
		props_alert = {},
		icon = 'error',
	}: Display_Alert_Interface) => {
		if (success)
			return MySwal.fire({
				title: msg,
				icon: 'success',
				timer: 2000,
				...props_alert,
			});
		if (!success && errors.length === 0)
			return MySwal.fire({
				title: msg,
				icon,
				timer: 2500,
				...props_alert,
			});
		const errorsMsgs = errors
			.map(error => `<li class="text-start">${error}</li>`)
			.reduce((html, value) => html + value, '');

		return MySwal.fire({
			title: msg,
			icon,
			html: `<ul>${errorsMsgs}</ul>`,
			...props_alert,
		});
	};
	return {
		display_alert,
	};
};
