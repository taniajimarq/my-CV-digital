import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Loquesoy = () => {
	return (
		<>
			<div className='bg-gradient-to-r from-white via-[#B87F9E] to-white p-6 md:pl-24 h-auto'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-7'>
					{/*Tarjeta de misión*/}
					<div className='w-full'>
						<Card className='min-[1300px]:h-[200px]'>
							<CardHeader>
								<CardTitle>Mi misión</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600'>
									Desarrollar mi carrera profesiónal formando
									parte de una empresa que me permita aplicar
									lo que he aprendido y seguir creciendo de
									manera tanto profesiónal como personal.
								</p>
							</CardContent>
						</Card>
					</div>
					{/*Tarjeta de sisión*/}
					<div className='w-full'>
						<Card className='min-[1300px]:h-[200px]'>
							<CardHeader>
								<CardTitle>Mi visión</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600'>
									Crear diseños llamativos, intuitivos y
									funcionales que mejoren la experiencia de
									las personas que utilizan tecnología
									ayudando a lograr sus objetivos de manera
									rápida y eficaz.
								</p>
							</CardContent>
						</Card>
					</div>
					{/*Tarjeta de valores*/}
					<div className='w-full'>
						<Card className='min-[1300px]:h-[200px]'>
							<CardHeader>
								<CardTitle>Mis valores</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-gray-600'>
									He aprendido a trabajar y vivir bajo valores
									que me permiten ser quien soy:
								</p>

								<span className='text-gray-800'>
									Pasión, Respeto, Honestidad,
									Responsabilidad, Puntualidad
								</span>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
};
export default Loquesoy;
