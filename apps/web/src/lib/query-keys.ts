export const queryKeys = {
  auth: {
    session: ['auth', 'session'] as const,
    user: ['auth', 'user'] as const,
  },
  notes: {
    list: ['notes', 'list'] as const,
  },
} as const;
