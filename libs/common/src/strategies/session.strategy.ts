import { FastifyRequest } from 'fastify';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { SessionPayload } from '@common/interfaces';
import { SessionService } from 'libs/providers/session/session.service';

@Injectable()
export class SessionStrategy extends PassportStrategy(Strategy, 'session') {
  constructor(private sessionService: SessionService) {
    super();
  }

  async validate(request: FastifyRequest): Promise<SessionPayload> {
    const role = request.session.get('role');
    const sessionId = request.session.get('sessionId');

    if (!sessionId || !role)
      throw new UnauthorizedException(
        'Session ID or role not found in cookies',
      );

    const session = await this.sessionService.find(sessionId);

    if (!session || session.userAgent !== request.headers['user-agent'])
      throw new UnauthorizedException('Invalid or expired session');

    return { id: session.user as string, role };
  }
}
