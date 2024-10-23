import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponse {
  @ApiProperty({ type: Number, example: 400 })
  statusCode: number;

  @ApiProperty({
    oneOf: [
      { type: 'string', example: 'Error message' },
      {
        type: 'array',
        items: { type: 'string' },
        example: ['Error message 1', 'Error message 2'],
      },
    ],
  })
  message: string | string[];
}
