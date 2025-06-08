'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

function DashboardView() {
	const { data: session } = authClient.useSession();
	const router = useRouter();
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold ">Dashboard</h1>
			<p className="">Logged as {session?.user.name}</p>
			<button onClick={() => authClient.signOut({
				fetchOptions: {
					onSuccess: () => router.push('/login'),
				}
			})}> Logout </button>
		</div>
	);
}

export default DashboardView;
