import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,

  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ErrorConstants } from '../errors/exception.constants';


@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof Error) {
      this.logger.error(
        `Server exception: ${exception.message}`,
        exception.stack,
      );
    } else if (('message' in exception) as any) {
      this.logger.error(`Server exception: ${exception.message}`);
    } else {
      this.logger.error(`Server exception: ${exception}`);
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let result =
      exception instanceof HttpException
        ? exception.getResponse()
        : ErrorConstants.InternalServerError;

    if (typeof exception === 'object' && exception.hasOwnProperty('message')) {
      result = exception;

      if (exception.hasOwnProperty('status')) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        if (typeof exception.status === 'number') {
          status = exception.status;
        } else {
          status = 500;
        }
      }
    }

    response.status(status).send(result);
  }
}
