/// <reference types="vite/client" />

import { Toaster } from '@starter/ui/components/shadcn/sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { OptionalUserProvider } from '@/contexts/optional-user-context';
import { authLoader } from '@/lib/auth-loader';
import type { RouterContext } from '@/router';
import appCss from '@/styles/app.css?url';

const RootComponent = () => {
  const { user } = Route.useRouteContext();

  return (
    <RootDocument>
      <OptionalUserProvider user={user}>
        <Outlet />
      </OptionalUserProvider>
    </RootDocument>
  );
};

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      className="h-full"
      lang="en"
    >
      <head>
        <HeadContent />
      </head>
      <body className="h-full">
        {children}
        <Toaster
          closeButton
          richColors
        />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const { user } = await authLoader();
    return { user };
  },
  head: () => {
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title: 'Starter App' },
      ],
      links: [
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
      ],
    };
  },
  component: RootComponent,
  notFoundComponent: () => <div>Page not found</div>,
});
