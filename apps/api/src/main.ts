import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as _cluster from 'node:cluster';

import Big from 'big.js';
import helmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifySecureSession from '@fastify/secure-session';
import fastifyCookie from '@fastify/cookie';

import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import multipart from '@fastify/multipart';

import { ExceptionsFilter } from '@common/filters/ExceptionFilter';
import { AppClusterService } from '@app/app-services/app-cluster/app-cluster.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const cluster = _cluster as unknown as _cluster.Cluster;

// const telegramEndpoints = [
//   /^https:\/\/web\.telegram\.org$/,
//   /^https:\/\/tg\.me$/,
//   /^https:\/\/t\.me$/,
// ];

async function bootstrap() {
  const logger = new Logger('APP:API');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  Big.RM = Big.roundDown;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
    }),
  );

  app.useGlobalFilters(new ExceptionsFilter());

  app.enableCors({
    origin: [process.env.WEB_APP_URL!],
    credentials: true,
    exposedHeaders: 'X-Version',
  });

  await app.register(fastifyCookie);
  await app.register(fastifySecureSession, {
    secret: configService.get<string>('SESSION_SECRET', 'secret') as string,
    salt: configService.get<string>('SESSION_SALT', 'salt') as string,
    cookie: {
      path: '/',
      secure:
        configService.get<string>('NODE_ENV', 'development') === 'production',
    },
  });

  await app.register(multipart);

  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
    xFrameOptions: {
      action: 'deny',
    },
    noSniff: true,
    permittedCrossDomainPolicies: {
      permittedPolicies: 'none',
    },
  });

  await app.register(fastifyCsrf);

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 5000;
  const host = process.env.HOST || '127.0.0.1';

  if (configService.get('NODE_ENV', 'development') !== 'production') {
    const cssFilePath = join(process.cwd(), './static/swagger-theme.css');
    const customCss = readFileSync(cssFilePath, 'utf8');

    const appName = 'ST-CRM';
    const config = new DocumentBuilder()
      .setTitle(appName)
      .setDescription(`${appName} API Documentation`)
      .setVersion('0.01')
      .addServer('api')
      .addServer(`http://127.0.0.1:${port}`)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    logger.verbose(document.info);

    SwaggerModule.setup('doc', app, document, {
      customCss,
    });
  }

  // const botService = app.get(BotService);

  // try {
  //   await botService.setWebhook();
  // } catch (error) {
  //   console.error('Failed to set webhook:', error.message);
  // }

  await app.listen(port, host, () => {
    if (cluster.isPrimary) {
      logger.verbose(`Server is listening on port ${host}:${port}`);
    }
  });
}

if (process.env.NODE_ENV !== 'local') {
  AppClusterService.clusterize(bootstrap);
} else {
  bootstrap();
}
