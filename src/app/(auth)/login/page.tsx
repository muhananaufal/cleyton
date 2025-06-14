import LoginView from '@/app/modules/login/login';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function Login() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect('/dashboard');
	}

	return <LoginView />;
}

export default Login;
