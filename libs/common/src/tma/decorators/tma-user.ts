import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { InitDataParsed, parse, User } from '@tma.js/init-data-node';
import { FastifyRequest } from 'fastify';

export const TMAUser = createParamDecorator(
  (field: keyof User, ctx: ExecutionContext) => {
    const req: FastifyRequest = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, initDataRaw]: string[] = (req.headers.authorization || '').split(
      ' ',
    );
    const initData: InitDataParsed = parse(initDataRaw);

    const user = initData?.user;

    if (!user) throw new ForbiddenException('Invalid User');

    return field ? user[field] : user;
  },
);
