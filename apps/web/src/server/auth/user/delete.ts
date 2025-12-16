import { deleteUser } from '@starter/backend/services/auth/user/delete';
import { createServerFn } from '@tanstack/react-start';
import { protectedMiddleware } from '@/middleware/protected';

export const deleteAccountFn = createServerFn({ method: 'POST' })
  .middleware([protectedMiddleware])
  .handler(async ({ context }) => {
    await deleteUser(context.user.id);
    return { success: true };
  });
