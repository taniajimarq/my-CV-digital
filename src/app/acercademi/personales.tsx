import React from 'react';
import { IoEllipseOutline } from 'react-icons/io5';

const Personales = () => {
	return (
		<>
			{/*Listado de habilidades personales*/}
			<div className='w-5/6'>
				<h2 className='text-[#3e7abf] font-bold text-xl mb-5'>
					Habilidades
				</h2>
				<ul className='flex flex-col '>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>Excelente comunicación oral y escrita.</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>Trabajo en equipo y capacidad de liderazgo.</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>Toma de decisiones.</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>
							Desarrollo de experiencias centradas en el ser
							humano.
						</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>Capacidad de autoaprendizaje.</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>
							Pensamiento estratégico, crítico y analítico.
						</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>Flexibilidad, negociación y empatía.</span>
					</li>
				</ul>
			</div>
		</>
	);
};
export default Personales;
