import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db.ts';
import { account, session, user, verification } from './schema.ts';

export const auth = betterAuth({
  trustedOrigins: (process.env.TRUSTED_ORIGINS || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim()),
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { user, session, account, verification },
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
