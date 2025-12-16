/**
 * EXAMPLE: Note create server function - DELETE when building your own features
 */

import { createNote } from '@starter/backend/services/note/create';
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { protectedMiddleware } from '../../middleware/protected';

const createNoteSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().max(10000).optional(),
});

export const createNoteAction = createServerFn({ method: 'POST' })
  .middleware([protectedMiddleware])
  .inputValidator(createNoteSchema)
  .handler(async ({ context, data }) => {
    return createNote({
      title: data.title,
      content: data.content,
      userId: context.user.id,
    });
  });
