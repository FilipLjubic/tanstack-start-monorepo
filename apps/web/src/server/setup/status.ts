import { checkDatabaseConnection } from '@starter/backend/services/health/check';
import { createServerFn } from '@tanstack/react-start';

export const getSetupStatus = createServerFn({ method: 'GET' }).handler(
  async () => {
    const dbConnected = await checkDatabaseConnection();

    const googleConfigured =
      !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

    const authSecretConfigured =
      !!process.env.BETTER_AUTH_SECRET &&
      process.env.BETTER_AUTH_SECRET !==
        'your-secret-here-change-in-production';

    return {
      database: dbConnected,
      googleAuth: googleConfigured,
      authSecret: authSecretConfigured,
      allComplete: dbConnected && googleConfigured && authSecretConfigured,
    };
  }
);
