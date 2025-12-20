# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.26.0 --activate
WORKDIR /app

# -----------------------------------------------------------
# Dependencies stage - cached when package.json files unchanged
# -----------------------------------------------------------
FROM base AS deps

COPY --link pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY --link apps/web/package.json ./apps/web/
COPY --link packages/backend/package.json ./packages/backend/
COPY --link packages/logger/package.json ./packages/logger/
COPY --link packages/ui/package.json ./packages/ui/
COPY --link packages/tsconfig/package.json ./packages/tsconfig/

RUN pnpm install --frozen-lockfile

# -----------------------------------------------------------
# Build stage - copy source and build the app
# -----------------------------------------------------------
FROM deps AS build

COPY --link . .

RUN pnpm --filter @starter/web build

# -----------------------------------------------------------
# Production stage - minimal runtime image
# -----------------------------------------------------------
FROM gcr.io/distroless/nodejs22-debian12 AS production

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

COPY --link --from=build /app/apps/web/.output ./apps/web/.output

EXPOSE 3000

CMD ["./apps/web/.output/server/index.mjs"]
