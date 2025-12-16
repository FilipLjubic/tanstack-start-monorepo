import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button';
import { getSession } from '@/server/auth/session/get';

const searchSchema = z.object({
  redirect: z.string().optional(),
  error: z.string().optional(),
});

const Login = () => {
  const { redirectTo } = Route.useLoaderData();
  const { error } = Route.useSearch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="font-semibold text-2xl text-slate-900">Sign in</h1>
          <p className="mt-2 text-slate-600 text-sm">
            Sign in to access your dashboard
          </p>
        </div>

        {error ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-sm">
            Authentication failed. Please try again.
          </div>
        ) : null}

        <GoogleSignInButton
          callbackURL={redirectTo}
          newUserCallbackURL={redirectTo}
          className="w-full"
          fullWidth
        />

        <p className="mt-6 text-center text-slate-500 text-xs">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/auth/login')({
  validateSearch: searchSchema,
  loader: async ({ location }) => {
    const session = await getSession();
    const params = new URLSearchParams(location.search);
    const redirectParam = params.get('redirect');
    const redirectTarget =
      redirectParam && redirectParam.startsWith('/')
        ? redirectParam
        : '/dashboard';

    if (session?.user) {
      throw redirect({ to: redirectTarget });
    }

    return {
      redirectTo: redirectTarget,
    };
  },
  component: Login,
});
