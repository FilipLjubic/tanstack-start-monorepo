import { createServerFn } from '@tanstack/react-start';
import { protectedMiddleware } from '@/middleware/protected';

export const getCurrentUser = createServerFn({ method: 'GET' })
  .middleware([protectedMiddleware])
  .handler(({ context }) => {
    return { ...context.user };
  });
