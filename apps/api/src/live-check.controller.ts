import { HttpStatusCode } from 'axios';
import { Controller, Get } from '@nestjs/common';

@Controller('live-check')
export class LiveCheckController {
  constructor() {}

  @Get()
  liveCheck() {
    return HttpStatusCode.Ok;
  }
}
