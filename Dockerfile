FROM node:26.13.0-alpine AS builder

WORKDIR /workspace

RUN npm install --global @yarnpkg/cli-dist@4.12.0

COPY . .
RUN yarn install --immutable
RUN yarn build

FROM node:26.13.0-alpine
WORKDIR /
EXPOSE 3000

RUN mkdir -p /app
COPY --from=builder /workspace/.output /app/.

ENTRYPOINT [ "node", "/app/server/index.mjs" ]

