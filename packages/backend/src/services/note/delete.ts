/**
 * EXAMPLE: Note delete service - DELETE when building your own features
 */

import { and, eq } from 'drizzle-orm';
import { db } from '../../db.ts';
import { note } from '../../schema.ts';

export const deleteNote = async (noteId: string, userId: string) => {
  const [deleted] = await db
    .delete(note)
    .where(and(eq(note.id, noteId), eq(note.userId, userId)))
    .returning({ id: note.id });
  return deleted;
};
