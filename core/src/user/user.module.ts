import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { UserController } from '@app/core/user/user.controller';
import { userClientOptions } from '@common/clients/user-client.options';
import { UserStatsModule } from '@app/app-services/user-stats/user-stats.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER',
        ...userClientOptions,
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
