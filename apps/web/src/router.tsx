import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import type { User } from '@/types/backend';

import { routeTree } from './routeTree.gen';

export type RouterContext = {
  queryClient: QueryClient;
  user: User | null;
};

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: (failureCount, error) => {
          if (error && typeof error === 'object' && 'status' in error) {
            const status = (error as { status: number }).status;
            if (status >= 400 && status < 500) {
              return false;
            }
          }
          return failureCount < 3;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    context: { queryClient, user: null },
    defaultPreload: 'intent',
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
