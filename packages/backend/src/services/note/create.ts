/**
 * EXAMPLE: Note create service - DELETE when building your own features
 */

import { db } from '../../db.ts';
import { note } from '../../schema.ts';

type CreateNoteInput = {
  title: string;
  content?: string;
  userId: string;
};

export const createNote = async (input: CreateNoteInput) => {
  const [created] = await db
    .insert(note)
    .values({
      title: input.title,
      content: input.content,
      userId: input.userId,
    })
    .returning({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    });
  return created;
};
