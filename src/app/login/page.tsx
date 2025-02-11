'use client';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { IoLogoGithub } from 'react-icons/io5';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();

	const onSubmit = handleSubmit(async data => {
		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		if (res?.error) {
			alert(res.error);
		} else {
			router.push('/portafolio/new');
		}
	});

	return (
		<div className='flex justify-center items-centerh-screen p-20'>
			<div className='p-10 w-96 shadow-lg rounded-lg bg-white'>
				<form onSubmit={onSubmit} className='space-y-4'>
					<div>
						<Label className='block text-sm font-medium text-gray-700'>
							Correo electrónico
						</Label>
						<input
							type='email'
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
							placeholder='ejemplo@gmail.com'
							{...register('email', {
								required: 'El email es obligatorio',
							})}
						/>
						{errors.email && (
							<span className='text-red-500 text-xs'>
								{String(errors.email.message)}
							</span>
						)}
					</div>

					<div>
						<Label className='block text-sm font-medium text-gray-700'>
							Contraseña
						</Label>
						<input
							type='password'
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500'
							placeholder='****'
							{...register('password', {
								required: 'La contraseña es obligatoria',
							})}
						/>
						{errors.password && (
							<span className='text-red-500 text-xs'>
								{String(errors.password.message)}
							</span>
						)}
					</div>

					<div className='space-y-2'>
						<button
							type='submit'
							className='w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300'
						>
							Iniciar Sesión
						</button>

						<button
							type='button'
							onClick={() =>
								signIn('github', {
									callbackUrl: '/portafolio/new',
								})
							}
							className='w-full flex items-center justify-center gap-2 text-black bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-300'
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
