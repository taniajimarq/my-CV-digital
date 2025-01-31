'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
	path: string;
	title: string;
	isOpen?: boolean;
}

export const SidebarMenuItems = ({ path, title, isOpen = false }: Props) => {
	const currentPath = usePathname();
	return (
		<Link
			href={path}
			className={
				isOpen
					? `block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white ${currentPath === path ? '' : ''}`
					: `
           rounded-md px-3 py-2 text-base ml-8 font-medium text-slate-700 hover:text-slate-950
            ${currentPath === path ? '' : ''}
            `
			}
		>
			<div className='flex flex-col'>{title}</div>
		</Link>
	);
};
