import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TrayectoriaPage = () => {
	return (
		<>
			<div className='w-full h-auto bg-gradient-to-r from-[#5F39BA] via-[#5F39BA] to-[#ffffff] p-6 md:pl-24 relative mb-5'>
				<span className='text-white font-semibold text-xl'>
					Mi trayectoria en el mundo laboral
				</span>
				<p className='mb-4 text-base font-normal text-white'>
					Soy una persona creativa y apasionada por crear experiencias
					que satisfagan las necesidades humanas al utilizar
					tecnología
				</p>
			</div>
			<ol className='relative border-s border-[#5F39BA] '>
				<li className='mb-10 ms-4'>
					<div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-full mb-10 mt-10'>
						<ul className='ms-4'>
							<div className='absolute w-3 h-3 bg-indigo-600 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
							<time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
								Noviembre 2022 - Actual
							</time>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								Secretaría de Seguridad Pública
							</h3>
							<p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
								Análisis y levantamiento de requerimientos,
								diseño UX/UI y flujos de usuario gestionando el
								tiempo de trabajo de los usuarios recibiendo
								feedback y aplicando cambios para la mejora
								continua.
							</p>
							<p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
								Planeación y gestión de proyectos de software de
								desarrollo de software orientado a mejorar los
								flujos de trabajo y la experiencia de los
								usuarios y pruebas de integración para realizar
								entregas continuas al usuario utilizando
								metodología Ágile y Design Thinking (DevOps).
							</p>
							<p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
								Maquetado de interfaces y responsive designe.
							</p>
						</ul>
					</div>
				</li>
				<li className='mb-5 ms-4'>
					<div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg p-6  left-0 '>
						<ul className='mb-10 ms-4'>
							<div className='absolute w-3 h-3 bg-indigo-600 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
							<time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
								Abril 2021 - 2022
							</time>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								IBM Student
							</h3>
							<p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
								Diseño UX/UI, usabilidad en la creación y
								seguimiento de procesos digitales, maquetado de
								interfaces, análisis, diseño UX/UI, Gestión de
								proyectos de software y pruebas de integración
								para realizar entregas continuas al usuario
								utilizando metodología Ágile y Design Thinking.
							</p>
							<p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
								Analista de negocios: Análisis de requerimientos
								por medio de la metodología de Design Thinking,
								para crear soluciones enfocadas en las
								necesidades y problemas de los usuarios.
								Entregas de prototipos visuales que incorporan
								los elementos necesarios para que sea funcional.
							</p>
						</ul>
						<div className='flex flex-row justify-between space-x-5 mb-5'>
							<div className='flex flex-row w-1/4 justify-center '>
								<Link
									href='https://sites.google.com/soy.utj.edu.mx/taniajimnezcv/acerca-de-m%C3%AD/certificados?authuser=0'
									target='_blank'
									rel='noopener noreferrer'
								>
									<Image
										src='/assets/Udemy.webp'
										width={170}
										height={170}
										alt='Certificado IBM'
										className='cursor-pointer'
									/>
								</Link>
							</div>
							<div className='flex flex-row w-1/4 justify-center '>
								<Link
									href='https://www.credly.com/badges/a8745ec5-4224-4c71-ac24-95948db4ab74?source=linked_in_profile'
									target='_blank'
									rel='noopener noreferrer'
								>
									<Image
										src='/assets/IBM-Power-Skills.png'
										width={150}
										height={150}
										alt='Certificado IBM'
										className='cursor-pointer'
									/>
								</Link>
							</div>
							<div className='flex flex-row w-1/4 justify-center '>
								<Link
									href='https://www.credly.com/badges/0684844f-1065-4de0-93a5-6455c8ab0a8e?source=linked_in_profile'
									target='_blank'
									rel='noopener noreferrer'
								>
									<Image
										src='/assets/IBM-Virtual-Collaborator-1.png'
										width={150}
										height={150}
										alt='Certificado IBM'
										className='cursor-pointer'
									/>
								</Link>
							</div>
							<div className='flex flex-row w-1/4 justify-center '>
								<Link
									href='https://www.credly.com/badges/4750689b-f467-45a8-b877-adbe3d807677?source=linked_in_profile'
									target='_blank'
									rel='noopener noreferrer'
								>
									<Image
										src='/assets/IBM-Agile-Explorer.png'
										width={150}
										height={150}
										alt='Certificado IBM'
										className='cursor-pointer'
									/>
								</Link>
							</div>
							<div className='flex flex-row w-1/4 justify-center '>
								<Link
									href='https://www.credly.com/badges/383741cb-3c1c-42ff-8a24-3f7b332717b2?source=linked_in_profile'
									target='_blank'
									rel='noopener noreferrer'
								>
									<Image
										src='/assets/Badges_IBM_Practitioner.png'
										width={150}
										height={150}
										alt='Certificado IBM'
										className='cursor-pointer'
									/>
								</Link>
							</div>
						</div>
					</div>
				</li>
				<li className='ms-4'>
					<div className=' bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-10'>
						<ul className='mb-10 ms-4'>
							<div className='absolute w-3 h-3 bg-indigo-600 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
							<time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
								Marzo 2021 - Abril 2021
							</time>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
								Esprezza
							</h3>
							<p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
								Becario en el área de soporte técnico encargado
								de atender incidencias de hardware y software
								dentro de la empresa.
							</p>
						</ul>
					</div>
				</li>
			</ol>
		</>
	);
};

export default TrayectoriaPage;
