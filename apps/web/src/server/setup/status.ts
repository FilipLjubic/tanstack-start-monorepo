import {
  checkDatabaseConnection,
  checkMigrationsApplied,
} from '@starter/backend/services/health/check';
import { createServerFn } from '@tanstack/react-start';

export const getSetupStatus = createServerFn({ method: 'GET' }).handler(
  async () => {
    const dbConnected = await checkDatabaseConnection();
    const migrationsApplied = dbConnected
      ? await checkMigrationsApplied()
      : false;

    const googleConfigured =
      !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

    const authSecretConfigured =
      !!process.env.BETTER_AUTH_SECRET &&
      process.env.BETTER_AUTH_SECRET !==
        'your-secret-here-change-in-production';

    const databaseReady = dbConnected && migrationsApplied;

    return {
      database: databaseReady,
      googleAuth: googleConfigured,
      authSecret: authSecretConfigured,
      allComplete: databaseReady && googleConfigured && authSecretConfigured,
    };
  }
);
