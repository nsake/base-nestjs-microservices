import { Injectable, Logger } from '@nestjs/common';
import fs from 'node:fs';
import { join } from 'path';
import { Reader, ReaderModel } from '@maxmind/geoip2-node';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GeoReaderService {
  private readonly logger = new Logger(GeoReaderService.name);
  private geoReader: ReaderModel;

  constructor() {
    try {
      this.updateReader();
    } catch (e) {
      setTimeout(this.updateReader, 10_000);
    }
  }

  country(ip: string) {
    return this.geoReader.country(ip);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleUpdateReader() {
    try {
      this.updateReader();
      this.logger.log('GeoIp2 Reader updated.');
    } catch (e) {}
  }

  private updateReader() {
    const dbBuffer = fs.readFileSync(
      join(process.cwd(), 'geoip2', 'GeoLite2-Country.mmdb'),
    );
    this.geoReader = Reader.openBuffer(dbBuffer);
  }
}
