import { Module } from '@nestjs/common';
import { UserStatsService } from '@app/app-services/user-stats/user-stats.service';
import { MongooseModule } from '@nestjs/mongoose';
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
  providers: [UserStatsService],
  exports: [UserStatsService],
})
export class UserStatsModule {}
