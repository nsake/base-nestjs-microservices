import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InitDataParsed, parse } from '@tma.js/init-data-node';
import { FastifyRequest } from 'fastify';

export const TMAUserDB = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req: FastifyRequest = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [__, initDataRaw]: string[] = (req.headers.authorization || '').split(
      ' ',
    );
    const initData: InitDataParsed = parse(initDataRaw);

    return initData.user;
  },
);
