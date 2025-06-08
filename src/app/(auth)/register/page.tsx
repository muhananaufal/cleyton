import RegisterView from '@/app/modules/register/register';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function Register() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect('/dashboard');
	}

	return <RegisterView />;
}

export default Register;
