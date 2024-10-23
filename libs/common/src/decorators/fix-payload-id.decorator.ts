import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FixPayloadId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const context = ctx.switchToRpc();
    const request = context.getData();
    if (data) {
      if (request[data]?.id) {
        request[data]._id = request[data].id;
      }

      return request[data];
    }
    return request;
  },
);
