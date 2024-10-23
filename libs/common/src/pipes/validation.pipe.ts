import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  public catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as Response;

    const exceptionResponse = (exception as any).response;

    const exceptionMessage =
      exceptionResponse.errors && exceptionResponse.errors[0]?.constraints
        ? exceptionResponse.errors[0]?.constraints?.isNotEmpty ||
          Object.values(exceptionResponse.errors[0]?.constraints)[0]
        : exceptionResponse.message || (exception as any)?.message?.message;

    response.status(422).json({
      statusCode: 422,
      error: `Unprocessable Entity`,
      message: exceptionMessage || 'Invalid Payload',
    });
  }
}
