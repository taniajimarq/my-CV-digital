/* import Image from 'next/image'; */
import Link from 'next/link';

import React from 'react';
import { buttonVariants } from './button';

const Footer = () => {
	return (
		<>
			<div className='h-1 w-screen bg-gray-300' />
			<footer className='bg-white rounded-lg shadow-sm dark:bg-gray-900 flex  shrink-0 items-center mt-auto w-screen h-[100px]'>
				<div className='w-full max-w-screen-xl mx-auto py-4 h-full flex flex-col justify-center'>
					<div className='sm:flex sm:items-center sm:justify-between w-full'>
						{/* <Image
							src='/assets/logo.png'
							width={100}
							height={100}
							alt='logo ux'
							className='w-[200px]'
						/> */}

						<span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
							© 2025 Tania Jiménez . Reservados todos los
							derechos.
						</span>
						<ul className='flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
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
		</>
	);
};

export default Footer;
