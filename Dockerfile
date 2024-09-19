FROM node:22.9-alpine AS builder

WORKDIR /workspace

COPY . .
RUN yarn install
RUN yarn build

FROM node:22.9-alpine
WORKDIR /
EXPOSE 3000

RUN mkdir -p /app
COPY --from=builder /workspace/.output /app/.

ENTRYPOINT [ "node", "/app/server/index.mjs" ]

