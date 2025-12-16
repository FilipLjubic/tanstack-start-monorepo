import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { v7 as uuid } from 'uuid';

export const user = pgTable('user', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuid()),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}).enableRLS();

export const session = pgTable('session', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuid()),
  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp()
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
}).enableRLS();

export const account = pgTable('account', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuid()),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
  createdAt: timestamp().notNull(),
  updatedAt: timestamp().notNull(),
}).enableRLS();

export const verification = pgTable('verification', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuid()),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}).enableRLS();

/**
 * EXAMPLE: Note table - DELETE when building your own features
 *
 * This table demonstrates the schema pattern. To remove:
 * 1. Delete this table definition
 * 2. Run `pnpm --filter @starter/backend drizzle:push` to sync
 * 3. Delete packages/backend/src/services/note/ directory
 * 4. Delete apps/web/src/server/note/ directory
 * 5. Update the dashboard to remove notes example
 */
export const note = pgTable('note', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuid()),
  title: text().notNull(),
  content: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}).enableRLS();
