import React from 'react';
import Tecnicas from './tecnicas';
import Personales from './personales';
const Habilidades = () => {
	return (
		<>
			<div className='flex flex-col md:flex-row min-[1200px]:space-x-7'>
				<div className='w-full flex flex-row text-[#7d7d7d] font-sans shadow-xl p-20 max-[1200px]:p-10'>
					<Personales />
				</div>
				<div className='w-full flex flex-row text-[#7d7d7d] font-sans shadow-xl p-20 max-[1200px]:p-10'>
					<Tecnicas />
				</div>
			</div>
		</>
	);
};
export default Habilidades;
