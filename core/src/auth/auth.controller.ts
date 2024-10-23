import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { ExceptionsFilter } from '@common/filters/ExceptionFilter';
import { Public } from '@common/decorators';
import { RegisterDto } from './dto/register.dto';
import { ExceptionResponse, SuccessResponse } from '@common/responses';

@ApiTags('/api/auth/')
@Public()
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(new ExceptionsFilter())
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(RoleGuard)
  @Post('register')
  @ApiOkResponse({
    type: SuccessResponse,
    description: 'User created successfully.',
  })
  @ApiDefaultResponse({ type: ExceptionResponse })
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
