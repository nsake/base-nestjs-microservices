import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

class MetaResponse {
  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  total: number;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  lastPage: number;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  currentPage: number;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
  })
  perPage: number;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  prev: number | null;

  @ApiProperty({
    type: 'integer',
    format: 'int32',
    nullable: true,
  })
  next: number | null;
}

export class PaginationResponse<T> {
  @ApiProperty({
    type: 'object',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    type: () => MetaResponse,
  })
  meta: MetaResponse;

  constructor(data: T[], meta: MetaResponse) {
    this.data = data;
    this.meta = meta;
  }
}

export const createPaginationResponse = <T>(itemType: Type<T>) => {
  class PaginationResponseDto extends PaginationResponse<T> {
    @ApiProperty({
      type: itemType,
      isArray: true,
    })
    data: T[];
  }

  return PaginationResponseDto;
};
