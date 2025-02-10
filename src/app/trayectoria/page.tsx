import React from 'react';

const TrayectoriaPage = () => {
	return (
		<>
			<div className='relative flex flex-col items-center p-10'>
				{/* Línea central en desktop, a la izquierda en móvil */}
				<div className='absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-pink-500'></div>

				{/* Primer div */}
				<div className='w-full md:w-1/2 flex md:justify-end pl-10 md:pr-8 relative'>
					{/* Línea de conexión */}
					<div className='absolute left-0 md:left-auto md:right-1/2 top-1/2 transform -translate-y-1/2 w-8 h-[2px] bg-pink-500'></div>
					<div className='relative bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-96'>
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

				{/* Segundo div */}
				<div className='w-full md:w-1/2 flex md:justify-start pl-20 md:pl-8 relative mt-10 md:mt-0'>
					{/* Línea de conexión */}
					<div className='absolute left-0 md:left-1/2 top-1/2 transform -translate-y-1/2 w-8 h-[2px] bg-pink-500'></div>
					<div className='relative bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-96'>
						<time className='mb-1 text-sm font-normal text-gray-400'>
							Marzo 2021 - Abril 2021
						</time>
						<h3 className='text-lg font-semibold text-gray-900'>
							Esprezza
						</h3>
						<p className='text-base font-normal text-gray-500'>
							Becario en el área de soporte técnico encargado de
							atender incidencias de hardware y software dentro de
							la empresa.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
export default TrayectoriaPage;
