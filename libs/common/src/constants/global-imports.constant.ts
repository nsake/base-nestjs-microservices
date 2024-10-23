import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from '@common/config/configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

export const globalImports = [
  ScheduleModule.forRoot(),

  EventEmitterModule.forRoot(),

  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [configuration],
    envFilePath: ['.env.local', '.env'],
  }),

  CacheModule.register({
    isGlobal: true,
    ttl: 600_000, //10 minutes
    store: redisStore,
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  }),

  ThrottlerModule.forRoot({
    throttlers: [
      {
        ttl: 1000,
        limit: 200,
      },
    ],
  }),

  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],

    useFactory: (configService: ConfigService) => ({
      uri: configService.get('database.uri'),
      dbName: 'st-crm',
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000, // Тайм-аут вибору сервера
      maxPoolSize: configService.get<number>('MONGODB_POOL_SIZE') ?? 50,
      // directConnection: true, //enable for not cluster database
    }),
  }),
];
