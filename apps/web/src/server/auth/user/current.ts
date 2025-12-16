import { auth } from '@starter/backend/auth';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import type { User } from '@/types/backend';

/**
 * Low-level server function to get the current user from the session
 * WARNING: This is ONLY for middleware use - does not enforce authentication
 * For regular application use, use getCurrentUser() instead
 */
export const getCurrentUserForMiddleware = createServerFn({
  method: 'GET',
}).handler(async (): Promise<User | null> => {
  try {
    const headers = getRequestHeaders();

    // Get the session from the auth library
    const session = await auth.api.getSession({ headers });

    if (session?.user) {
      return session.user as User;
    }

    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
});
