import { ApiProperty } from '@nestjs/swagger';

export class BalancesDto {
  @ApiProperty({ type: String, example: 0.0 })
  balance: string;

  @ApiProperty({ type: String, example: 0.0 })
  referralBalance: string;
}
