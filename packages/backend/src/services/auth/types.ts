import type { getUser } from './user/get.ts';

export type User = Awaited<ReturnType<typeof getUser>>;
