import { ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SessionGuard extends AuthGuard('session') {
  canActivate(context: ExecutionContext): boolean {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    return !!request.session.get('sessionId');
  }
}
