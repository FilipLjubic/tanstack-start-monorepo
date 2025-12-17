/** biome-ignore-all lint/performance/noNamespaceImport: Don't care */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';

if (!process.env.DATABASE_URL) {
  throw 'Missing DATABASE_URL, run pnpm --filter @starter/backend db:start or get the connection string';
}

const client = postgres(process.env.DATABASE_URL);

export const db = drizzle({
  client,
  schema,
  casing: 'snake_case',
});
