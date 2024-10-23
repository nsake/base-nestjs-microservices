import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty({ type: Boolean })
  success: boolean;
}
