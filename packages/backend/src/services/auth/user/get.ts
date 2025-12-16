import { eq } from 'drizzle-orm';
import { db } from '../../../db.ts';
import { user } from '../../../schema.ts';

export const getUser = async (userId: string) => {
  const rows = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);
  const first = rows[0];
  if (!first) {
    throw new Error('User not found');
  }
  return first;
};
