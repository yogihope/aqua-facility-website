# syntax=docker/dockerfile:1

# Multi-stage build for the Aqua corporate website (Next.js 16 + Prisma 6).
# deps caches node_modules on package-lock.json; builder produces
# .next/standalone; runner carries only that output.

FROM node:24-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

FROM node:24-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the bundle at build time, so they are
# build args, not runtime env. The defaults describe the test deployment:
# staging keeps it out of search indexes (robots.ts, layout metadata).
ARG NEXT_PUBLIC_SITE_URL=https://test.aquafacility.com
ARG NEXT_PUBLIC_ENV=staging
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV \
    NEXT_TELEMETRY_DISABLED=1

# No DATABASE_URL at build time: withDb() falls back to authored content, so
# every page generates without a database.
RUN npm run build

FROM node:24-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# The standalone server does not bundle public/ or .next/static.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

# Optional at runtime: DATABASE_URL. Without it the site serves authored
# content, and the lead/application forms answer 503 instead of storing.
CMD ["node", "server.js"]
