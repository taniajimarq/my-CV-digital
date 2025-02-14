'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

{
	/*Ruta privada, se asegura que exista un usuario logueado para poder acceder a ella */
}
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'loading') return;
		if (!session) router.push('/login');
	}, [session, status, router]);

	if (status === 'loading') return <p>Cargando...</p>;

	return <>{children}</>;
};

export default PrivateRoute;
