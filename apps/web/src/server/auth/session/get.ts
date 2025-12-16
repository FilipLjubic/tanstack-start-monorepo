import { auth } from '@starter/backend/auth';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import type { User } from '@/types/backend';

type SessionSummary = {
  user: User;
};

export const getSession = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session) {
      return null;
    }

    return {
      user: session.user as User,
    } satisfies SessionSummary;
  }
);
