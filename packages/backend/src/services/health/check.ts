import { sql } from 'drizzle-orm';
import { db } from '../../db.ts';

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    ),
  ]);

export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await withTimeout(db.execute(sql`SELECT 1`), 3000);
    return true;
  } catch {
    return false;
  }
};

export const checkMigrationsApplied = async (): Promise<boolean> => {
  try {
    const result = await withTimeout(
      db.execute<{ exists: boolean }>(sql`
        SELECT EXISTS (
          SELECT 1 FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = 'user'
        ) as exists
      `),
      3000
    );
    return result[0]?.exists === true;
  } catch {
    return false;
  }
};
