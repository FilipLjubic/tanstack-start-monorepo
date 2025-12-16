import { redirect } from '@tanstack/react-router';
import { createMiddleware } from '@tanstack/react-start';
import { userMiddleware } from './user';

/**
 * Protected Middleware
 *
 * This middleware enforces authentication.
 * It depends on userMiddleware to provide the user context and ensures:
 * 1. User is authenticated (logged in)
 * 2. Redirects to login if not authenticated
 *
 * Context provided:
 * - `user`: The authenticated User object (guaranteed to be non-null)
 *
 * Usage in server functions:
 * ```typescript
 * // Require any authenticated user
 * const myServerFn = createServerFn()
 *   .middleware([protectedMiddleware])
 *   .handler(async ({ context }) => {
 *     const user = context.user; // Always available and typed as User (not null)
 *     // User is guaranteed to be authenticated
 *   });
 * ```
 */

/**
 * Creates a protected middleware that enforces authentication
 */
export const protectedMiddleware = createMiddleware({ type: 'function' })
  .middleware([userMiddleware])
  .server(({ next, context }) => {
    const user = context.user;

    if (!user) {
      throw redirect({
        to: '/auth/login',
      });
    }

    return next({
      context: {
        user, // Pass through the authenticated user (non-null)
      },
    });
  });
