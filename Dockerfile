# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.26.0 --activate
WORKDIR /app

# -----------------------------------------------------------
# Dependencies stage - cached when package.json files unchanged
# -----------------------------------------------------------
FROM base AS deps

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/backend/package.json ./packages/backend/
COPY packages/logger/package.json ./packages/logger/
COPY packages/ui/package.json ./packages/ui/
COPY packages/tsconfig/package.json ./packages/tsconfig/

RUN pnpm install --frozen-lockfile

# -----------------------------------------------------------
# Build stage - copy source and build the app
# -----------------------------------------------------------
FROM deps AS build

COPY . .

RUN pnpm --filter @starter/web build

# -----------------------------------------------------------
# Production stage - minimal runtime image
# -----------------------------------------------------------
FROM base AS production

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/apps/web/.output ./apps/web/.output
COPY --from=build /app/apps/web/package.json ./apps/web/
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-workspace.yaml ./

EXPOSE 3000

CMD ["pnpm", "--filter", "@starter/web", "start"]
