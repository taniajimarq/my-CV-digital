'use client';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react';
import { IoLogoGithub } from 'react-icons/io5';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSwalAlert } from '../portafolio/useSwalAlert';
import PacmanLoader from 'react-spinners/PacmanLoader';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	});
	const router = useRouter();
	const { display_alert } = useSwalAlert();
	const [needsCode, setNeedsCode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [loadinGit, setLoadinGit] = useState(false);
	const [blocked, setBlocked] = useState(false);
	const [blockTime, setBlockTime] = useState<number | null>(null);

	// Revisar si el usuario ya está bloqueado al cargar la página
	useEffect(() => {
		const storedBlockTime = localStorage.getItem('blockTime');
		if (storedBlockTime) {
			const timeRemaining = parseInt(storedBlockTime, 10) - Date.now();
			if (timeRemaining > 0) {
				setBlocked(true);
				setBlockTime(parseInt(storedBlockTime, 10));
			} else {
				localStorage.removeItem('blockTime');
			}
		}
	}, []);

	// Temporizador para desbloquear el botón después de 5 minutos
	useEffect(() => {
		if (blockTime) {
			const interval = setInterval(() => {
				const timeRemaining = blockTime - Date.now();
				if (timeRemaining <= 0) {
					setBlocked(false);
					setBlockTime(null);
					localStorage.removeItem('blockTime');
					clearInterval(interval);
				}
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [blockTime]);

	//Verificar usuario de github
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		if (params.get('error') === 'unauthorized') {
			display_alert({
				success: false,
				icon: 'error',
				msg: 'Tu usuario de GitHub no tiene permisos para acceder.',
			}).then(() => {
				router.replace('/login'); // Limpia la URL después de la alerta
			});
		}
	}, [router]);

	// Envío de datos para iniciar sesión

	const onSubmit = handleSubmit(async data => {
		setLoadingBtn(true);

		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			code: data.code || '',
			redirect: false,
		});

		// Extraer mensaje de error si está en formato JSON
		let errorMessage = res?.error || '';
		try {
			const parsedError = JSON.parse(res?.error || '{}');
			errorMessage = parsedError.message || errorMessage;
		} catch {
			console.error('Error al parsear el mensaje:', res?.error);
		}

		if (errorMessage === 'Código enviado') {
			setNeedsCode(true);
			setLoadingBtn(false);
			setLoading(true);

			display_alert({
				success: false,
				icon: 'warning',
				msg: 'Código enviado. Revisa tu correo.',
			});
		} else if (errorMessage === 'Código de verificación incorrecto') {
			setNeedsCode(true);
			setLoadingBtn(false);
			display_alert({
				success: false,
				msg: 'Código incorrecto. Inténtalo de nuevo.',
			});
		} else if (errorMessage.includes('Demasiados intentos')) {
			setBlocked(true);
			setLoadingBtn(false);
			setLoading(false);
			const unblockTime = Date.now() + 5 * 60 * 1000;
			setBlockTime(unblockTime);
			localStorage.setItem('blockTime', unblockTime.toString());

			display_alert({
				success: false,
				msg: 'Demasiados intentos fallidos. Intenta más tarde.',
			});
		} else if (errorMessage) {
			setLoading(false);
			setLoadingBtn(false);
			display_alert({
				success: false,
				msg: errorMessage,
			});
		} else {
			router.push('/portafolio/new');
			setLoading(false);
			setLoadingBtn(false);
			display_alert({
				success: true,
				msg: 'Bienvenido',
			});
		}
	});

	return (
		<div className='flex justify-center min-h-screen p-6 sm:p-10 pt-[10px] sm:pt-0'>
			<div className='p-6 sm:p-10 h-3/4 w-full max-w-md shadow-lg rounded-lg bg-white'>
				<form onSubmit={onSubmit} className='space-y-4'>
					<div>
						<Label className='block text-sm font-medium text-gray-700'>
							Correo electrónico
						</Label>
						<input
							type='email'
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
							placeholder='ejemplo@gmail.com'
							{...register('email')}
							required
							disabled={needsCode}
						/>
						{errors.email && (
							<span className='text-red-500 text-xs'>
								{String(errors.email.message)}
							</span>
						)}
					</div>

					{!needsCode && (
						<div>
							<Label className='block text-sm font-medium text-gray-700'>
								Contraseña
							</Label>
							<input
								type='password'
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
								placeholder='****'
								{...register('password')}
								required
								disabled={needsCode}
							/>
							{errors.password && (
								<span className='text-red-500 text-xs'>
									{String(errors.password.message)}
								</span>
							)}
						</div>
					)}

					<div className='flex flex-col items-center justify-center '>
						{/* Se muestra el loader de Pacman mientras el usuario agrega el código de verificación */}
						<PacmanLoader color='#e0dd47' loading={loading} />
					</div>

					{needsCode && (
						<div>
							<Label className='block text-sm font-medium text-gray-700'>
								Código de verificación
							</Label>
							<input
								type='text'
								className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
								placeholder='Código'
								{...register('code', {
									required: 'El código es obligatorio',
								})}
							/>
							{errors.code && (
								<span className='text-red-500 text-xs'>
									{String(errors.code.message)}
								</span>
							)}
						</div>
					)}

					<div className='space-y-2'>
						{loadingBtn ? (
							<div className='w-full flex flex-row justify-center mb-10'>
								<PropagateLoader
									color='#5a16e9'
									loading={loadingBtn}
								/>
							</div>
						) : (
							<button
								type='submit'
								className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all'
								disabled={blocked || loadingBtn}
							>
								{needsCode
									? 'Verificar Código'
									: 'Iniciar Sesión'}
							</button>
						)}

						<button
							type='button'
							onClick={() => {
								setLoadinGit(true);
								signIn('github', {
									callbackUrl: '/portafolio/new',
								});
							}}
							className='w-full flex items-center justify-center gap-2 text-black bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 transition-all'
						>
							<IoLogoGithub className='w-5 h-5' />
							{!loadinGit ? 'Iniciar con GitHub' : 'Cargando... '}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
