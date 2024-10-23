# ST CRM

![NSAKE](https://img.shields.io/badge/nsake-000000.svg?style=for-the-badge&logo=teamcity&logoColor=white)

## Stack

| Item            | Name                   |
| --------------- | ---------------------- |
| Package Manager | yarn                   |
| Framework       | NestJs - Fastify       |
| Database        | MongoDB - (ReplicaSet) |
| ORM             | Mongoose               |
| Docker          | Containers run         |


## ENV

| Name var                   | Required | Description                       |
|----------------------------|----------|-----------------------------------|
| PROJECT_NAME               | no       | project name                      |
| NODE_ENV                   | no       | node environment                  |
| PORT                       | no       | application port for nodejs       |
|                            |          |                                   |
| BOT_TOKEN                  | yes      | telegram bot token                |
| WEB_APP_URL                | yes      | link to app (front)               |
|                            |          |                                   |
| MONGODB_URI                | yes      | mongodb url                       |
| MONGODB_POOL_SIZE          | no       | mongodb pool size                 |
| MONGO_INITDB_ROOT_USERNAME | no       | monogodb root user                |
| MONGO_INITDB_ROOT_PASSWORD | no       | mongodb roo password              |
| REQUEST_ENC_KEY            | yes      | encryption key                    |
|                            |          |                                   |
| REDIS_HOST                 | yes      | redis host                        |
| REDIS_PORT                 | yes      | redis port                        |
|                            |          |                                   |
| NATS_HOST                  | yes      | nats host                         |
| NATS_PORT                  | yes      | nats port                         |
|                            |          |                                   |
| CHAT_MEMBER_BOT_TOKEN      |          |                                   |
| TWITTER_BEARER_TOKEN       |          | twitter beaber token              |
| TWITTER_ACCESS_TOKEN       |          | twitter beaber access token       |
| TWITTER_API_KEY            |          | twitter api key                   |
| TWITTER_API_KEY_SECRET     |          | twitter api key scret             |
|                            |          |                                   |
| DOCKER_BUILD_TARGET        | no       | docker target for build           |
| DOCKER_API_HOST            | no       | docker api host                   |
| DOCKER_API_PORT            | no       | docker api port for host          |
| DOCKER_MONGO_HOST          | no       | docker mongodb host               |
| DOCKER_MONGO_PORT          | no       | docker mongodb port for host      |
| DOCKER_REDIS_HOST          | no       | docker redis host                 |
| DOCKER_REDIS_PORT          | no       | docker redis port for host        |
| DOCKER_NAT_HOST            | no       | docker nats host                  |
| DOCKER_NAT_PORT            | no       | docker nats port for host         |
| DOCKER_NAT_MNG_HOST        | no       | docker nats manager host          |
| DOCKER_NAT_MNG_PORT        | no       | docker nats manager port for host |


## Run in docker

Docker includes next dependences:
- NodeJS
- MongoDB
- Redis
- Nats

### Default variables to conection some dependencies between docker containers


| Services | Host    | Port  | User  | Password |
|----------|---------|-------|-------|----------|
| MongoDB  | mongodb | 27017 | admin | password |
| Redis    | redis   | 6379  |       |          |
| Nats     | nats    | 4222  |       |          |


### Run docker container

```
# Clone .env
cp .env.example .env

# Please settings env
nano .env

# First run or rebuild
docker compose up -d --build

# Other run
docker compose up -d
```

**By default, the API starts on port 5000**

## Run without docker

```
# Clone .env
cp .env.example .env

# Please settings env
nano .env

# Install node modules
yarn install

# Build all services
yarn build: all

# Run services in dev mode (include watch)
yarn start:dev api
yarn start:dev notification
yarn start:dev game
yarn start:dev user

# Run services in prod mode
yarn start:prod
yarn start:prod notification
yarn start:prod game
yarn start:prod user
```
