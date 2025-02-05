'use client';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from '@/components/ui/card';

/* import { Trash2, Settings  } from 'lucide-react'; */
import Image from 'next/image';
import { Listado } from './listado';

export function ListProjects() {
	const { projectsAll } = Listado();

	return (
		<>
			<div className='flex flex-row md:space-x-7 max-sm:flex-col'>
				{projectsAll ? (
					projectsAll.map(e => (
						<div key={e.id}>
							<Card
								className='flex flex-col justify-between mb-5 cursor-pointer h-full '
								onClick={() => window.open(e.url, '_blank')}
							>
								<CardHeader className='flex items-center justify-between gap-2'>
									<p className='text-2xl font-semibold'>
										{e.title.toUpperCase()}
										{/* {project.name.toUpperCase()} */}
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
										// src={'/assets/naturityClean.png'}
										width={500}
										height={500}
										// alt={''}
										className='w-screen h-auto rounded p-5'
									/>
								</CardContent>
								<CardFooter className='grid grid-rows grid-flow-col items-start mt-2 w-full bg-[#F8F8F8CC]'>
									<div className='flex flex-col items-start'>
										<p className='text-lg font-semibold mt-2'>
											{e.subTitle}
											{/* ${project.subTitle} */}
										</p>
										<p className='mt-2 text-slate-500'>
											{e.description}
											{/* {project.description} */}
										</p>
									</div>
									<div className='flex flex-col justify-center items-end h-full'>
										{/* <Link href="/products/new" className="flex items-end"> */}
										{/* <Settings
							onClick={() => {
								setIsOpen(true);
							}}
							className='h-6 w-6 text-gray-500 cursor-pointer'
						/> */}
										{/* </Link> */}
									</div>
								</CardFooter>
							</Card>
						</div>
					))
				) : (
					<></>
				)}
			</div>
			<br />
		</>
	);
}
