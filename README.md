# TanStack Monorepo Starter

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
git clone <your-repo-url>
cd tanstack-monorepo-starter
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy environment files:
```bash
cp apps/web/env.example apps/web/.env
cp packages/backend/env.example packages/backend/.env
```

4. Start local Supabase:
```bash
pnpm --filter @starter/backend supabase:start
```

5. Run database migrations:
```bash
pnpm --filter @starter/backend drizzle:push
```

6. Start the development server:
```bash
pnpm --filter @starter/web dev
```

Visit http://localhost:3000

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env` files

## Development

### Commands

```bash
# Development
pnpm --filter @starter/web dev          # Start web dev server
pnpm --filter @starter/backend supabase:start   # Start local Supabase

# Database
pnpm --filter @starter/backend drizzle:generate  # Generate migrations
pnpm --filter @starter/backend drizzle:push      # Push schema changes
pnpm --filter @starter/backend drizzle:studio    # Open Drizzle Studio

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
- **note** - Example table for CRUD operations

## Deployment

### Railway

1. Create a new Railway project
2. Add a PostgreSQL database
3. Connect your GitHub repository
4. Set environment variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `BETTER_AUTH_SECRET` - Random secret for auth
   - `BETTER_AUTH_URL` - Your production URL
   - `GOOGLE_CLIENT_ID` - Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET` - Google OAuth secret
   - `TRUSTED_ORIGINS` - Your production domain

See [docs/RAILWAY_DEPLOYMENT.md](docs/RAILWAY_DEPLOYMENT.md) for detailed instructions.

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
