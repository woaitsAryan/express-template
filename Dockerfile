FROM node:20-alpine as base

FROM base AS deps

WORKDIR /app
COPY package.json pnpm-lock.yaml* ./

RUN corepack enable pnpm && pnpm i --frozen-lockfile --prod && pnpm install -D typescript

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server_user

RUN mkdir build
RUN chown server_user:nodejs build

COPY --from=builder --chown=server_user:nodejs /app/build ./
COPY --from=builder --chown=server_user:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=server_user:nodejs /app/package.json ./package.json

USER server_user

ENTRYPOINT ["node"]
CMD ["app.js"]
