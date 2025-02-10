'use client';
import { Label } from '@radix-ui/react-label';
import React from 'react';
import { IoLogoGithub } from 'react-icons/io5';
import { signIn } from 'next-auth/react';

const Login = () => {
	return (
		<div className='flex justify-center items-center pt-20'>
			<div className='p-20 w-4/12 justify-center shadow-lg'>
				{/* <form className='max-w-sm '> */}
				<div className='mb-5'>
					<Label
						typeof='email'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Correo electrónico
					</Label>
					<input
						className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
						placeholder='ejemplo@gmail.com'
					/>
				</div>
				<div className='mb-5'>
					<Label
						typeof='password'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Contraseña
					</Label>
					<input
						className='shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light'
						placeholder='****'
					/>
				</div>

				<div className='space-x-5 flex flex-row'>
					<button className='text-white w-1/2 bg-indigo-900 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
						Iniciar Sesión
					</button>

					<button
						onClick={() =>
							signIn('github', { callbackUrl: '/portafolio/new' })
						}
						className='flex items-center w-1/2  gap-2 text-black bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
					>
						<IoLogoGithub className='w-5 h-5' />
						Iniciar con GitHub
					</button>
				</div>
				{/* </form> */}
			</div>
		</div>
	);
};
export default Login;
