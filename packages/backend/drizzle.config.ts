import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load .env if DATABASE_URL not already set
// Tries: local .env first (for db commands), then falls back to web app's .env
if (!process.env.DATABASE_URL) {
  config(); // ./packages/backend/.env
  if (!process.env.DATABASE_URL) {
    config({ path: '../../apps/web/.env' }); // fallback to web app env
  }
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
