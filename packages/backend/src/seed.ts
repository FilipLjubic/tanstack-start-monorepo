/**
 * Database seed script
 *
 * Seeds the database with sample data for development.
 * Run manually with: pnpm --filter @starter/backend seed
 */

import { config } from 'dotenv';

// Load env: try local first, then web app
config();
if (!process.env.DATABASE_URL) {
  config({ path: '../../apps/web/.env' });
}
// import { db } from './db.ts';
// import { user } from './schema.ts';

const seed = async () => {
  console.log('Seeding database...');

  // Example: Create a test user
  //
  // const [testUser] = await db
  //   .insert(user)
  //   .values({
  //     name: 'Test User',
  //     email: 'test@example.com',
  //     emailVerified: true,
  //   })
  //   .onConflictDoNothing()
  //   .returning();
  //
  // if (testUser) {
  //   console.log(`Created user: ${testUser.email}`);
  // }

  console.log('Seeding complete!');
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
