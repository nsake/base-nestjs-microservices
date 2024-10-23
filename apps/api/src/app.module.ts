import { Module } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@app/core/auth/auth.module';
import { UserModule } from '@app/core/user/user.module';
import { LiveCheckController } from './live-check.controller';
import { ExceptionsFilter } from '@common/filters/ExceptionFilter';
import { globalImports } from '@common/constants/global-imports.constant';

@Module({
  imports: [
    /* Native */
    ...globalImports,
    /* Native */

    /* Modules */
    UserModule,
    AuthModule,
  ],
  controllers: [LiveCheckController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
