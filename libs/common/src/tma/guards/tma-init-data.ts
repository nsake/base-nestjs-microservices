import { ErrorConstants } from '@common/errors/exception.constants';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { validate } from '@tma.js/init-data-node';
import { Observable } from 'rxjs';

@Injectable()
export class TMAInitDataGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request?.headers?.authorization;

    if (!authorization) {
      throw new HttpException(
        // ErrorConstants.NoAuthorizationHeaders,
        '',
        HttpStatus.FORBIDDEN,
      );
    }

    const [type, initDataRaw] = request.headers.authorization.split(` `);

    if (type !== 'tma' || !initDataRaw) return false;

    try {
      // validate(initDataRaw, process.env.BOT_TOKEN);

      return true;
    } catch {
      return false;
    }
  }
}
