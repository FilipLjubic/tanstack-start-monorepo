import { sql } from 'drizzle-orm';
import { db } from '../../db.ts';

export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await db.execute(sql`SELECT 1`);
    return true;
  } catch {
    return false;
  }
};
