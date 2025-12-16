import { eq } from 'drizzle-orm';
import { db } from '../../../db.ts';
import { user } from '../../../schema.ts';

export const deleteUser = async (userId: string): Promise<void> => {
  await db.delete(user).where(eq(user.id, userId));
};
