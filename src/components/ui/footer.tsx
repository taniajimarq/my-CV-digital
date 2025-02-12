/* import Image from 'next/image'; */
import Link from 'next/link';

import React from 'react';
import { buttonVariants } from './button';
import { IoCallOutline } from 'react-icons/io5';

const Footer = () => {
	return (
		<>
			<div className='sm:flex sm:justify-end sm:items-center '>
				<footer className='bg-white rounded-l dark:bg-gray-900 flex shrink-0 items-center mt-auto w-screen h-[100px] border-t border-gray-300 shadow-lg'>
					<div className='w-full max-w-screen-xl mx-auto py-4 h-full flex flex-col justify-center'>
						<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full text-center sm:text-left'>
							<span className='block text-sm text-gray-500 dark:text-gray-400'>
								© 2025 Tania Jiménez . Reservados todos los
								derechos.
							</span>
							<span className='flex justify-center sm:justify-start text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-0'>
								<Link
									className='flex flex-row items-center gap-x-2' // Agrega espacio entre icono y número
									href='https://wa.me/3311387789'
									target='_blank'
									rel='noopener noreferrer'
								>
									<IoCallOutline className='w-5 h-5' />{' '}
									{/* Ajusta tamaño si es necesario */}
									<span>33 11 38 77 89</span>
								</Link>
							</span>
							<ul className='flex justify-center sm:justify-end flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 mt-2 sm:mt-0'>
								<Link
									href={
										'https://www.linkedin.com/in/tania-jimenezm'
									}
									className={buttonVariants({
										variant: 'outline',
									})}
								>
									Mi contacto en linkedin
								</Link>
							</ul>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
};

export default Footer;
