/**
 * EXAMPLE: Note list server function - DELETE when building your own features
 */

import { listNotes } from '@starter/backend/services/note/list';
import { createServerFn } from '@tanstack/react-start';
import { protectedMiddleware } from '../../middleware/protected';

export const getNotes = createServerFn({ method: 'GET' })
  .middleware([protectedMiddleware])
  .handler(async ({ context }) => {
    return listNotes(context.user.id);
  });
