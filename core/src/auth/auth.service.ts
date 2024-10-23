import * as mongoose from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDto } from './dto/register.dto';
import { ESchemas } from '@common/db/enums/schemas.enum';
import { User } from '@tma.js/init-data-node';
import { ErrorConstants } from '@common/errors/exception.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ESchemas.Users) private userModel: mongoose.Model<User>,
  ) {}

  async register(payload: RegisterDto) {
    const userExist = await this.userModel.findOne(
      {
        $or: [
          { email: payload.email },
          {
            username: payload.username,
          },
        ],
      },
      {
        email: 1,
        username: 1,
      },
    );

    if (userExist) throw new BadRequestException(ErrorConstants.UserDuplicated);

    await this.userModel.create(payload);

    return {
      success: true,
    };
  }
}
