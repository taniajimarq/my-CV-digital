import Image from 'next/image';

import React from 'react';

const Banner = () => {
	return (
		<>
			<br />
			<div className='flex flex-col md:flex-row justify-between w-full h-auto bg-gradient-to-r from-white via-[#5F39BA] to-[#105881] p-6 md:pl-24 relative'>
				{/* Línea a la derecha (Oculta en móviles) */}
				<div className='hidden md:block absolute right-20 top-0 h-full w-1 bg-white bg-opacity-30' />
				<div className='hidden md:block absolute right-10 top-0 h-full w-1 bg-white' />

				<Image
					src='/assets/tanias.png'
					width={350}
					height={300}
					alt='logo ux'
					className='m-2 mx-auto md:mx-0'
				/>

				<div className='flex flex-col text-white font-medium text-2xl md:text-4xl text-center md:text-right justify-center pr-6 md:pr-40'>
					<span>¡Hola! Mi nombre es Tania y soy diseñadora UX</span>
					<span className='text-sm mt-2'>
						Me especializo en crear experiencias de usuario tanto en
						desarrollo como en la gestión de proyectos de software
					</span>
				</div>

				{/* Línea inferior de todo el ancho (Oculta en móviles) */}
				<div className='hidden md:block absolute bottom-8 right-20 w-8/12 h-1 bg-white bg-opacity-30'></div>
				<div className='hidden md:block absolute bottom-16 right-10 w-8/12 h-1 bg-white'></div>
			</div>
		</>
	);
};

export default Banner;
