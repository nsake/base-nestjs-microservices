import { DynamicModule,  Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './schemas/user.schema';
import { UserAppService } from './user-app.service';
import { ESchemas } from '@common/db/enums/schemas.enum';
import { UserAppController } from '@apps/user/src/user-app/user-app.controller';

@Module({})
export class UserAppModule {
  static register(appName: string): DynamicModule {
    const controllers = appName === 'user' ? [UserAppController] : [];

    return {
      module: UserAppModule,

      imports: [
        MongooseModule.forFeature([
          {
            name: ESchemas.Users,
            schema: UserSchema,
          },
        ]),

      ],
      controllers: controllers,
      providers: [UserAppService],
      exports: [UserAppService],
    };
  }
}
