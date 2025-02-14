'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	path: string;
	title: string;
	isOpen?: boolean;
	setIsOpen?: (value: boolean) => void;
}

export const SidebarMenuItems = ({
	path,
	title,
	isOpen = false,
	setIsOpen,
}: Props) => {
	const currentPath = usePathname();
	return (
		<Link
			onClick={() => setIsOpen?.(false)} // Cierra el menú al hacer clic
			href={path}
			className={
				isOpen
					? `block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-300 hover:text-white ${currentPath === path ? '' : ''}`
					: `
           rounded-md px-3 py-2 text-base ml-8 font-medium text-slate-700 
            ${currentPath === path ? '' : ''}
            `
			}
		>
			<div className='flex flex-col'>{title}</div>
		</Link>
	);
};
