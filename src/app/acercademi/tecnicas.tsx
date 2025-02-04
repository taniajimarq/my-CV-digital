import React from 'react';
import { IoEllipseOutline } from 'react-icons/io5';

const Tecnicas = () => {
	return (
		<>
			<div className='w-5/6'>
				<h2 className='text-[#3e7abf] font-bold text-xl mb-5'>
					Habilidades técnicas
				</h2>
				<ul className='flex flex-col '>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>HTML, CSS, Bootstrap.</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>
							Conocimiento básico en React, NextJS, Tailwind,
							shadcnCSS.
						</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>Figma, Adobe XD, Invision Studio.</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>Levantamiento de requerimientos.</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>
							Metodologías Ágiles (Manejo de tableros Scrum y
							Kanban).
						</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>Design Thinking.</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>
							Conocimiento de leyes cognitivas en la creación de
							flujos de trabajo.
						</span>
					</li>
					<li className='flex flex-row items-center gap-2'>
						<IoEllipseOutline />
						<span>
							Investigación de casos de uso y desarrollo de diseño
							visual.
						</span>
					</li>
				</ul>
			</div>
		</>
	);
};
export default Tecnicas;
