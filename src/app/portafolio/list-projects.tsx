'use client';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from '@/components/ui/card';

/* import { Trash2, Settings  } from 'lucide-react'; */
import Image from 'next/image';
import { useCustomListado } from './useCustomListado';

export function ListProjects() {
	const { projectsAll } = useCustomListado();

	return (
		<>
			<div className='w-full h-auto bg-gradient-to-r from-[#5F39BA] via-[#5F39BA] to-[#ffffff] p-6 md:pl-24 relative mb-5'>
				<span className='text-white font-semibold text-xl'>
					Mi experiencia es laboral y académica, dale un vistazo a mis
					proyectos!
				</span>
				<p className='mb-4 text-base font-normal text-white'>
					Al trabajar para una empresa dedicada a la creación de
					soluciónes digitales pude obtener mi pasión por el deseño UX
					/ UI
				</p>
			</div>
			{/*Card reutilizable que se muestra con respecto a los ID que encuentra */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
				{projectsAll ? (
					projectsAll.map(e => (
						<Card
							key={e.id}
							className='flex flex-col justify-between mb-5 cursor-pointer h-full '
							onClick={() => window.open(e.url, '_blank')}
						>
							<CardHeader className='flex items-center justify-between gap-2'>
								<p className='text-2xl font-semibold'>
									{e.title.toUpperCase()}
								</p>
							</CardHeader>
							<hr className='w-full' />
							<CardContent className='flex flex-grow justify-center items-center '>
								<Image
									src={
										e.image && e.image.trim() !== ''
											? e.image
											: '/assets/sin_imagen.png'
									}
									alt={e.title || 'Imagen no disponible'}
									width={500}
									height={500}
									className='w-screen h-auto rounded p-5'
								/>
							</CardContent>
							<CardFooter className='grid grid-rows grid-flow-col items-start mt-2 w-full bg-[#F8F8F8CC]'>
								<div className='flex flex-col items-start'>
									<p className='text-lg font-semibold mt-2'>
										{e.subTitle}
									</p>
									<p className='mt-2 text-slate-500'>
										{e.description}
									</p>
								</div>
							</CardFooter>
						</Card>
					))
				) : (
					<></>
				)}
			</div>
			<br />
		</>
	);
}
