import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserStatsService } from '@app/app-services/user-stats/user-stats.service';

@Injectable()
export class UserStateInterceptor implements NestInterceptor {
  constructor(private readonly userStatsService: UserStatsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map(async (data) => {
        if (request.raw.user) {
          // const state = await this.userStatsService.getUserState(
          //   request.raw.user,
          // );
          // state.stats.earnedBalance = request.raw.syncData?.earnedBalance || 0;
          // return {
          //   ...data,
          //   state,
          // };
        }

        return data;
      }),
    );
  }
}
