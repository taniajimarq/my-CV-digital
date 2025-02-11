import React from 'react';
import { ListadoTable } from './listado-table';
import PrivateRoute from '@/components/ui/private/rute';

const PageProjects = () => {
	return (
		<>
			<PrivateRoute>
				<ListadoTable />
			</PrivateRoute>
		</>
	);
};
export default PageProjects;
