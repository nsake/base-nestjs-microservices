import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SessionPayload } from '@common/interfaces';

export const CurrentUser = createParamDecorator(
  (
    key: keyof SessionPayload,
    ctx: ExecutionContext,
  ): string | SessionPayload => {
    const request = ctx.switchToHttp().getRequest();
    return key ? request.user[key] : request.user;
  },
);
