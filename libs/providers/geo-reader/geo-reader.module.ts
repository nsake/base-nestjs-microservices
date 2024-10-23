import { Module } from '@nestjs/common';
import { GeoReaderService } from './geo-reader.service';

@Module({
  providers: [GeoReaderService],
  exports: [GeoReaderService],
})
export class GeoReaderModule {}
