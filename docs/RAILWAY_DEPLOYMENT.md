## How to Test Locally with Docker

```bash
cd apps/klasifikacija

# Using npm script (recommended)
pnpm test:prod

# Or directly with docker compose
docker compose up --build

# Visit http://localhost:3000
# Press Ctrl+C to stop
```

**Available scripts:**
- `pnpm test:prod` - Build and run production server in Docker
- `pnpm test:prod:rebuild` - Force rebuild (useful if you change dependencies)

## How to Deploy to Railway

### Option 1: Railway Dashboard
1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repo
4. Set root directory: `apps/klasifikacija`
5. Add environment variables (see below)
6. Deploy

### Option 2: Railway CLI
```bash
cd apps/klasifikacija
railway init
railway up
```

## Required Environment Variables

```bash
DATABASE_URL=your_supabase_postgres_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=https://your-app.railway.app
```

## Troubleshooting

### Docker Credential Error

If you see `docker-credential-desktop: executable file not found`:

```bash
# Fix by removing credsStore from Docker config
jq 'del(.credsStore)' ~/.docker/config.json > ~/.docker/config.json.tmp
mv ~/.docker/config.json.tmp ~/.docker/config.json
```

Then retry `pnpm test:prod`.