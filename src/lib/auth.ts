import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db';
import * as schema from '@/db/schema';

export const auth = betterAuth({
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
		// facebook: {
		// 	clientId: process.env.FACEBOOK_CLIENT_ID as string,
		// 	clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
		// },
		// twitter: {
		// 	clientId: process.env.TWITTER_CLIENT_ID as string,
		// 	clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
		// },
	},
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema: {
			...schema,
		},
	}),
});
