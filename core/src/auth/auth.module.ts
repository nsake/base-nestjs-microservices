import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { ESchemas } from '@common/db/enums/schemas.enum';
import { UserSchema } from '@apps/user/src/user-app/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ESchemas.Users,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
