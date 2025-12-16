/**
 * EXAMPLE: Note list service - DELETE when building your own features
 *
 * This file demonstrates the service pattern. To remove:
 * 1. Delete this file
 * 2. Delete sibling note service files (create.ts, delete.ts, types.ts)
 * 3. Delete the note table from schema.ts
 * 4. Remove note-related server functions from apps/web/src/server/note/
 * 5. Remove the notes example from the dashboard
 */

import { desc, eq } from 'drizzle-orm';
import { db } from '../../db.ts';
import { note } from '../../schema.ts';

export const listNotes = async (userId: string) => {
  return db
    .select({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    })
    .from(note)
    .where(eq(note.userId, userId))
    .orderBy(desc(note.createdAt));
};
