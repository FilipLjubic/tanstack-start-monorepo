import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Only load .env if DATABASE_URL not already set (allows .env.prod override via shell)
if (!process.env.DATABASE_URL) {
  config();
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

export default defineConfig({
  out: './supabase/migrations',
  schema: './src/schema.ts',
  dialect: 'postgresql',
  migrations: {
    prefix: 'supabase',
  },
  casing: 'snake_case',
  dbCredentials: {
    url: databaseUrl,
  },
});
