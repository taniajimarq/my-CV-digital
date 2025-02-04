import Image from 'next/image';
import React from 'react';
import Habilidades from './habilidades';
import Loquesoy from './loquesoy';

const AcercademiPage = () => {
	return (
		<>
			{/* Acerca de mi */}

			<div className='flex flex-col md:flex-row p-10 min-[1200px]:ml-5 shadow-xl'>
				<div className='w-full flex flex-col items-center  text-[#7d7d7d] font-sans'>
					<h1 className='text-[#0e2727] font-bold text-3xl'>
						Técnico Superior Universitario
					</h1>
					<h2 className='text-[#3e7abf] font-bold text-xl'>
						Especialista UX / UI orientada en el ser humano.
					</h2>
					<div className='mt-5 space-y-3 text-base leading-loose min-[1200px]:w-10/12 max-w-2xl'>
						<p>
							Soy egresada de Ingeniería en Tecnologías de la
							comunicación, área desarrollo y gestión de software.
						</p>
						<p>
							Tengo confianza en mi capacidad para generar ideas,
							trabajar en equipo, adquirir conocimientos y crecer
							profesionalmente.
						</p>
						<p>
							Mi pasión es crear y mejorar experiencias de los
							usuarios, pensando en el ser humano que utiliza las
							aplicaciones por medio de la tecnología, agilizando
							los procesos con diseños funcionales y atractivos.
						</p>
					</div>
				</div>
				<div className='flex justify-center items-center w-full max-[1200px]:mt-10'>
					<Image
						src='/assets/ux.jpg'
						width={500}
						height={200}
						alt='logo ux'
						className='rounded-xl shadow-lg'
					/>
				</div>
			</div>
			<br />

			{/* Cards misión visión y valores */}
			<Loquesoy />
			<br />
			{/* Habilidades personales y técnicas */}
			<Habilidades />
			<br />
		</>
	);
};
export default AcercademiPage;
