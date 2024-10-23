import * as _cluster from 'node:cluster';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { MicroserviceOptions } from '@nestjs/microservices';


import { UserInitModule } from './user-init.module';

import { userClientOptions } from '@common/clients/user-client.options';
import { AppClusterService } from '@app/app-services/app-cluster/app-cluster.service';

const cluster = _cluster as unknown as _cluster.Cluster;

async function bootstrap() {
  const logger = new Logger('APP:USER');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserInitModule,
    userClientOptions,
  );

  app.listen().then(() => {
    if (cluster.isPrimary) {
      logger.verbose('Microservice is listening...');
    }
  });
}

if (process.env.NODE_ENV !== 'local') {
  AppClusterService.clusterize(bootstrap);
} else {
  bootstrap();
}
