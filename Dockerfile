FROM oven/bun:latest

WORKDIR /app

COPY package.json ./

COPY bun.lockb ./

RUN bun install --production

COPY src ./

RUN bun run build

CMD [ "bun", "run", "start:prod" ]
