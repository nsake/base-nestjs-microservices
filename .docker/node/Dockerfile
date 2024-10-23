## RUN BASE ##
FROM node:alpine3.20 AS base

ENV HOST=0.0.0.0

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

FROM base AS base-build
RUN yarn build:all

## RUN DEVELOPMENT ##
FROM base AS development-api
CMD ["yarn", "start:dev", "api"]
EXPOSE $PORT

FROM base AS development-notification
CMD ["yarn", "start:dev", "notification"]

FROM base AS development-game
CMD ["yarn", "start:dev", "game"]

FROM base AS development-user
CMD ["yarn", "start:dev", "user"]

FROM base AS development-operations
CMD ["yarn", "start:dev", "operations"]


## RUN PRODUCTION ##
FROM base-build AS production-api
CMD ["yarn", "start:prod"]

EXPOSE $PORT

FROM base-build AS production-notification
CMD ["yarn", "start:prod:notification"]

FROM base-build AS production-game
CMD ["yarn", "start:prod:game"]

FROM base-build AS production-user
CMD ["yarn", "start:prod:user"]

FROM base-build AS production-operations
CMD ["yarn", "start:prod:operations"]
