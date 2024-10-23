import ms from 'ms';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Session } from 'libs/schemas/sessions.schema';
import { ESchemas } from '@common/db/enums/schemas.enum';

@Injectable()
export class SessionService {
  constructor(
    private readonly configService: ConfigService,

    @InjectModel(ESchemas.Sessions) private sessionModel: Model<Session>,
  ) {}

  async create(
    userId: string,
    userAgent: string,
    remember: boolean,
  ): Promise<Session> {
    const now = new Date().getTime();
    const expTime = ms(
      remember
        ? this.configService.get<string>('SESSION_REMEMBER_EXP', '7d')
        : this.configService.get<string>('SESSION_EXP', '60m'),
    );

    return this.sessionModel.create({
      data: {
        userId,
        exp: new Date(now + expTime),
        userAgent,
      },
    });
  }

  delete(sessionId: string) {
    return this.sessionModel.deleteOne({
      id: sessionId,
    });
  }

  async find(sessionId: string): Promise<Session | null> {
    const session = await this.sessionModel.findById(sessionId);

    if (session && new Date() > session.exp) {
      await this.delete(sessionId);

      return null;
    }

    return session;
  }
}
