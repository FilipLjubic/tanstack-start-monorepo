import {
  checkDatabaseConnection,
  checkMigrationsApplied,
} from '@starter/backend/services/health/check';
import { createServerFn } from '@tanstack/react-start';

export type SetupStatus = {
  isProduction: boolean;
  database: {
    connected: boolean;
    migrated: boolean;
  };
  googleAuth: boolean;
  allComplete: boolean;
};

export const getSetupStatus = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SetupStatus> => {
    const isProduction = process.env.NODE_ENV === 'production';

    const dbConnected = await checkDatabaseConnection();
    const migrationsApplied = dbConnected
      ? await checkMigrationsApplied()
      : false;

    const googleConfigured =
      !!process.env.GOOGLE_CLIENT_ID &&
      !!process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_CLIENT_ID !== 'not-configured' &&
      process.env.GOOGLE_CLIENT_SECRET !== 'not-configured';

    const databaseReady = dbConnected && migrationsApplied;

    return {
      isProduction,
      database: {
        connected: dbConnected,
        migrated: migrationsApplied,
      },
      googleAuth: googleConfigured,
      allComplete: databaseReady && googleConfigured,
    };
  }
);
