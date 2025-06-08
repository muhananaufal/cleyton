'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const formSchema = z
	.object({
		name: z.string().min(3, { message: 'Nama minimal 3 karakter' }),
		email: z.string().email({ message: 'Email tidak valid' }),
		password: z.string().min(6, { message: 'Password minimal 8 karakter' }),
		confirmPassword: z.string().min(6, { message: 'Password minimal 8 karakter' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password dan konfirmasi password harus sama',
		path: ['confirmPassword'],
	});

export default function RegisterView() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		setError(null);
		setPending(true);
		authClient.signUp.email(
			{
				name: data.name,
				email: data.email,
				password: data.password,
				callbackURL: '/dashboard',
			},
			{
				onSuccess: () => {
					setPending(false);
					router.push('/dashboard');
				},
				onError: ({ error }) => {
					setPending(false);
					setError(error.message);
				},
			}
		);
	};

	const onSocial = (provider: 'google') => {
		setError(null);
		setPending(true);
		authClient.signIn.social(
			{
				provider: provider,
				callbackURL: '/dashboard',
			},
			{
				onSuccess: () => {
					setPending(false);
				},
				onError: ({ error }) => {
					setPending(false);
					setError(error.message);
				},
			}
		);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input placeholder="Nama" type="text" {...register('name')} />
				{errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

				<input placeholder="Email" type="email" {...register('email')} />
				{errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

				<input placeholder="Password" type="password" {...register('password')} />
				{errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

				<input placeholder="Konfirmasi Password" type="password" {...register('confirmPassword')} />
				{errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}

				<button type="submit" disabled={pending}>
					Register
				</button>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</form>
			<br />
			<button onClick={() => onSocial('google')} disabled={pending}>
				Google
			</button>
			<br />
		</div>
	);
}
