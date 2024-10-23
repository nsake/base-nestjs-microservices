import { Module } from '@nestjs/common';

import { globalImports } from '@common/constants/global-imports.constant';
import { UserAppModule } from '@apps/user/src/user-app/user-app.module';

@Module({
  imports: [
    ...globalImports,

    UserAppModule.register('user'),
  ],
})
export class UserInitModule {}
