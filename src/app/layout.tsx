'use client';
import './globals.css';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/ui/navbar';
import Banner from './acercademi/banner';
import Footer from '@/components/ui/footer';
import { usePathname } from 'next/navigation';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const path = usePathname();
	return (
		<html lang='en' className=''>
			<body
				className={cn(
					'flex flex-col bg-background font-sans antialiased h-screen',
				)}
			>
				<main className='flex flex-col flex-grow '>
					<Navbar />
					{path === '/acercademi' && (
						<div className='bg-slate-200 pt-3 pb-3'>
							<Banner />
							<br />
						</div>
					)}

					<div className='flex-grow sm:mx-24 mx-3 mt-5'>
						{children}
					</div>

					<Footer />
				</main>
			</body>
		</html>
	);
}
