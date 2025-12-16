import { createAuthClient } from 'better-auth/client';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import type { auth } from '@/types/backend';

// Base config: adjust baseURL if backend served on different origin.
// For TanStack Start, relative endpoints should proxy to the server runtime.
export const authClient = createAuthClient({
  // baseURL: "/api/auth", // uncomment & adjust if you mount under a prefix
  plugins: [inferAdditionalFields<typeof auth>()],
});

type SignInWithGoogleArgs = {
  callbackURL?: string;
  newUserCallbackURL?: string;
  errorCallbackURL?: string;
};

// Google OAuth sign-in helper
export const signInWithGoogle = (args: SignInWithGoogleArgs = {}) => {
  const {
    callbackURL = '/dashboard',
    newUserCallbackURL = '/dashboard',
    errorCallbackURL = '/auth/login?error=oauth',
  } = args;

  // Ensure all URLs are strings and not objects
  const sanitizedCallbackURL = String(callbackURL);
  const sanitizedNewUserCallbackURL = String(newUserCallbackURL);
  const sanitizedErrorCallbackURL = String(errorCallbackURL);

  return authClient.signIn.social({
    provider: 'google',
    callbackURL: sanitizedCallbackURL,
    newUserCallbackURL: sanitizedNewUserCallbackURL,
    errorCallbackURL: sanitizedErrorCallbackURL,
  });
};

export const getSession = () => authClient.getSession();

export const signOut = async () => {
  // Sign out with better-auth (clears server-side session)
  await authClient.signOut();

  // Clear all cookies by setting them to expire
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    // biome-ignore lint/suspicious/noDocumentCookie: intentionally clearing all cookies on sign out
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // Also try with domain
    const domain = window.location.hostname;
    // biome-ignore lint/suspicious/noDocumentCookie: intentionally clearing all cookies on sign out
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
  }
};
