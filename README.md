# TanStack Start Monorepo

A production-ready monorepo starter template with TanStack Start, Better Auth, Drizzle ORM, Supabase, and Railway deployment.

## Features

- **TanStack Start** - Full-stack React framework with file-based routing and server functions
- **Better Auth** - Type-safe authentication with Google OAuth
- **Drizzle ORM** - TypeScript ORM with PostgreSQL
- **Supabase** - PostgreSQL database with local development support
- **Railway** - One-click deployment configuration
- **React 19** - Latest React with compiler optimization
- **Tailwind CSS v4** - Utility-first CSS with shadcn/ui components
- **Biome** - Fast linter and formatter

## Project Structure

```
apps/
  web/              # TanStack Start frontend application
packages/
  backend/          # Auth, database, and service operations
  ui/               # Shared React components (shadcn/ui)
  logger/           # Shared logging utilities
  tsconfig/         # Shared TypeScript configurations
```

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+
- Docker (for local Supabase)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/FilipLjubic/tanstack-start-monorepo.git
cd tanstack-start-monorepo
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy environment file:
```bash
cp apps/web/env.example apps/web/.env
```

> **Note**: `packages/backend/.env` is optional - only needed if you run drizzle commands directly from that directory. The drizzle config falls back to `apps/web/.env`.

4. Start local Supabase:
```bash
pnpm --filter @starter/backend db:start
```

> **Note**: To run Supabase CLI directly from root, use `pnpm supabase <command>` (e.g., `pnpm supabase status`). This ensures Supabase files stay in `packages/backend/supabase`.

5. Run database migrations:
```bash
pnpm --filter @starter/backend db:push
```

6. Start the development server:
```bash
pnpm --filter @starter/web dev
```

Visit http://localhost:3000

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select existing
3. Configure the OAuth consent screen
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env` files

## Development

### Commands

```bash
# Development
pnpm --filter @starter/web dev        # Start web dev server
pnpm --filter @starter/backend db:start   # Start local Supabase

# Database
pnpm --filter @starter/backend db:generate  # Generate migrations
pnpm --filter @starter/backend db:push      # Push schema changes
pnpm --filter @starter/backend db:studio    # Open Drizzle Studio
pnpm --filter @starter/backend db:seed      # Seed database with test data
pnpm --filter @starter/backend db:reset     # Reset DB, run migrations, and seed

# Code Quality
pnpm biome check --write .              # Lint and format
pnpm --filter @starter/web typecheck    # Type check
```

### Database Schema

The starter includes:
- **user** - User accounts (Better Auth managed)
- **session** - User sessions
- **account** - OAuth provider accounts
- **verification** - Email verification tokens
- **note** - Example table for CRUD operations (deletable)

## Removing Example Code

The starter includes a Notes CRUD example to demonstrate the patterns. Search for `DELETE` in the project to find all example code that can be removed:

```bash
grep -r "DELETE" --include="*.ts" --include="*.tsx" apps packages
```

After deleting example code:
1. Run `pnpm --filter @starter/backend db:push` to sync schema
2. Run `pnpm biome check --write .` to clean up unused imports
3. Run `pnpm --filter @starter/web typecheck` to verify no broken references

## Railway Deployment

### One-Click Deploy (Recommended)

1. Click **Deploy on Railway** button (or use the Railway template)
2. Wait for deployment to complete
3. Generate a public domain: Service Settings > Networking > Generate Domain
4. Add your `DATABASE_URL` in Railway variables, then redeploy
5. Run migrations (see below)

Railway automatically configures `BETTER_AUTH_SECRET`, `BASE_URL`, `BETTER_AUTH_URL`, and `TRUSTED_ORIGINS` when you generate the public URL.

### Database Options

You'll need a PostgreSQL database:

- **[Supabase](https://supabase.com)** - Free tier available, includes auth/storage extras
- **[Neon](https://neon.tech)** - Serverless Postgres, generous free tier
- **[Railway Postgres](https://railway.app)** - Add as separate service in your project
- **Self-hosted** - Any Postgres-compatible database

### Post-Deploy Setup

1. **Run migrations** against your production database:
   ```bash
   cp packages/backend/.env packages/backend/.env.prod
   # Edit .env.prod with your production DATABASE_URL
   pnpm --filter @starter/backend db:migrate:prod
   ```

2. **Configure Google OAuth** (optional):
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a new project or select existing
   - Configure the OAuth consent screen
   - Create OAuth 2.0 credentials (Web application)
   - Add authorized redirect URI: `https://your-app.railway.app/api/auth/callback/google`
   - Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in Railway variables

### Environment Variables Reference

| Variable | Auto-configured | Description |
|----------|-----------------|-------------|
| `DATABASE_URL` | No | PostgreSQL connection string (you provide this) |
| `BETTER_AUTH_SECRET` | Yes | Auto-generated on deploy |
| `BASE_URL` | Yes | Set when you generate public domain |
| `BETTER_AUTH_URL` | Yes | Set when you generate public domain |
| `TRUSTED_ORIGINS` | Yes | Set when you generate public domain |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret (optional) |

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | TanStack Start |
| Auth | Better Auth |
| Database | PostgreSQL + Drizzle ORM |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Build | Vite + Nitro |
| Package Manager | pnpm |
| Linting | Biome |

## License

MIT
