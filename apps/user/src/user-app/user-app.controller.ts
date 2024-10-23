import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserAppService } from './user-app.service';


@Controller()
export class UserAppController {
  constructor(

    private readonly userService: UserAppService,
  ) {}

  @MessagePattern('get-profile')
  updateProfile(
    @Payload('id') id: string
  ) {
    return this.userService.findById(id);
  }
}
