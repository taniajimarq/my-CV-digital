import React from 'react';

const TrayectoriaPage = () => {
	return (
		<>
			<div className='relative flex flex-col items-center p-10'>
				<div className='absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-pink-500'></div>

				{/* Primer item */}
				<div className='w-full md:w-1/2 flex justify-end pr-32 relative mt-10'>
					{/* Línea de conexión */}
					<div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-[2px] bg-pink-500'></div>

					<div className='relative bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-[400px]'>
						<time className='mb-1 text-sm font-normal text-gray-400'>
							Agosto 2015 - Febrero 2021
						</time>
						<h3 className='text-lg font-semibold text-gray-900'>
							SerimarqPrint
						</h3>
						<p className='text-base font-normal text-gray-500'>
							Gerente General: Atención a proveedores, compras de
							materiales, encargado de producción, facturación en
							el portal del SAT, atención al cliente.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default TrayectoriaPage;
