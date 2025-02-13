'use client';
import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
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

	const onSubmit = handleSubmit(async data => {
		console.log(data);
		setLoadingBtn(true);
		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			code: data.code || '',
			redirect: false,
		});

		if (res?.error?.includes('Código enviado')) {
			setNeedsCode(true);
			setLoadingBtn(false);
			setLoading(true);
			display_alert({
				success: false,
				icon: 'warning',
				msg: 'Código enviado. Revisa tu correo.',
			});
		} else if (res?.error?.includes('Código incorrecto')) {
			setNeedsCode(true); // Mantiene habilitado el input del código
			display_alert({
				success: false,
				msg: 'Código incorrecto. Inténtalo de nuevo.',
			});
		} else if (res?.error) {
			display_alert({
				success: false,
				msg: res.error,
			});
		} else {
			router.push('/portafolio/new');
			setLoading(false);
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
									cssOverride={{
										padding: '10px',
										margin: '10px',
									}}
								/>
							</div>
						) : (
							<button
								type='submit'
								className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-all'
							>
								{needsCode
									? 'Verificar Código'
									: 'Iniciar Sesión'}
							</button>
						)}

						<button
							type='button'
							onClick={() =>
								signIn('github', {
									callbackUrl: '/portafolio/new',
								})
							}
							className='w-full flex items-center justify-center gap-2 text-black bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 transition-all'
						>
							<IoLogoGithub className='w-5 h-5' />
							Iniciar con GitHub
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;
