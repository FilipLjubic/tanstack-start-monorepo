import { auth } from '@starter/backend/auth';
import { createMiddleware } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import type { User } from '@/types/backend';

/**
 * User Middleware
 *
 * This middleware extracts the authenticated user from the session and passes
 * it through the context chain. It provides access to the current user for
 * downstream middleware and server functions.
 *
 * Context provided:
 * - `user`: The full User object with profile data
 *
 * Usage in server functions:
 * ```typescript
 * const myServerFn = createServerFn()
 *   .middleware([userMiddleware])
 *   .handler(async ({ context }) => {
 *     const user = context.user; // Access current user
 *     if (!user) {
 *       throw new Error('User not authenticated');
 *     }
 *     // Access full user data: user.id, user.email, etc.
 *     console.log(`User: ${user.name}`);
 *     // Use user data...
 *   });
 * ```
 */
export const userMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    let user: User | null = null;

    try {
      // Get the current user directly from auth (not via server function)
      const headers = getRequestHeaders();
      const session = await auth.api.getSession({ headers });

      if (session?.user) {
        user = session.user as User;
      }
    } catch (error) {
      console.error('User middleware error:', error);
      // Continue with null user
    }

    // Pass user through context to downstream middleware/functions
    return next({
      context: {
        user,
      },
    });
  }
);
