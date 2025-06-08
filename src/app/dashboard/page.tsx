import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardView from '../modules/dashboard/dashboard';

async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect('/register');
	}

	return <DashboardView />;
}

export default Dashboard;
