'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	email: z.string().email({ message: 'Email tidak valid' }),
	password: z.string().min(8, { message: 'Password minimal 8 karakter' }),
});

export default function Login() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		setError(null);
		authClient.signIn.email(
			{
				email: data.email,
				password: data.password,
			},
			{
				onSuccess: () => {
					router.push('/');
				},
				onError: ({ error }) => {
					setError(error.message);
				},
			}
		);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input placeholder="Email" type="email" {...register('email')} />
				{errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

				<input placeholder="Password" type="password" {...register('password')} />
				{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

				<button type="submit">Login</button>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</form>
		</div>
	);
}
