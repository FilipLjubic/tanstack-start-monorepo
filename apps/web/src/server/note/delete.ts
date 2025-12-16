/**
 * EXAMPLE: Note delete server function - DELETE when building your own features
 */

import { deleteNote } from '@starter/backend/services/note/delete';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { protectedMiddleware } from '../../middleware/protected';

const deleteNoteSchema = z.object({
  noteId: z.string().uuid(),
});

export const deleteNoteAction = createServerFn({ method: 'POST' })
  .middleware([protectedMiddleware])
  .inputValidator(deleteNoteSchema)
  .handler(async ({ context, data }) => {
    return deleteNote(data.noteId, context.user.id);
  });
