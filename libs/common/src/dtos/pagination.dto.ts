import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  perPage: number;
}
