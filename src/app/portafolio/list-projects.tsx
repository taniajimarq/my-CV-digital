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
	const { projectsAll, loading } = useCustomListado();

	return (
		<>
			<div className=' w-full h-auto bg-gradient-to-r from-[#5F39BA] via-[#5F39BA] to-[#ffffff] p-6 md:pl-24 relative mb-5'>
				<div className='flex flex-row justify-between'>
					<span className='text-white font-semibold text-xl '>
						Mi experiencia es laboral y académica; dale un vistazo a
						¡Mis proyectos!
					</span>
				</div>
				<p className='mb-4 text-base font-normal text-white'>
					Al trabajar para una empresa dedicada a la creación de
					soluciones digitales pude obtener mi pasión por el diseño UX
					/ UI
				</p>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
				{loading ? (
					<>
						<div
							role='status'
							className='max-w-sm p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700'
						>
							<div className='flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700'>
								<svg
									className='w-10 h-10 text-gray-200 dark:text-gray-600'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 16 20'
								>
									<path d='M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z' />
									<path d='M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z' />
								</svg>
							</div>
							<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
							<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
							<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5'></div>
							<div className='h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
							<div className='flex items-center mt-4'>
								<div>
									<div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2'></div>
									<div className='w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700'></div>
								</div>
							</div>
							<span className='sr-only'>Loading...</span>
						</div>
					</>
				) : (
					projectsAll.map(e => (
						<Card
							key={e.id}
							className='flex flex-col justify-between mb-5 cursor-pointer h-full '
							onClick={() => window.open(e.url, '_blank')}
						>
							{/*Card reutilizable que se muestra con respecto a los ID que encuentra */}
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
				)}
			</div>
			<br />
		</>
	);
}
