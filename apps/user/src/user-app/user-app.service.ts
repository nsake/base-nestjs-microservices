import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, {
  Model,
  FilterQuery,
  QueryOptions,
  ProjectionType,
} from 'mongoose';

import { User } from './schemas/user.schema';
import { ESchemas } from '@common/db/enums/schemas.enum';


@Injectable()
export class UserAppService {
  constructor(
    @InjectModel(ESchemas.Users) private userModel: Model<User>,
  ) {}

  async create(user: Partial<User>, session?: mongoose.mongo.ClientSession) {
    const userEntity = new this.userModel(user);

    return userEntity.save({ session });
  }

  findById(
    id: string,
    projection?: ProjectionType<User>,
    options?: QueryOptions<User>,
    session?: mongoose.mongo.ClientSession,
  ) {
    return this.userModel.findById(id, projection, { ...options, session });
  }

  findOne(
    filter: FilterQuery<User>,
    projection?: ProjectionType<User>,
    options?: QueryOptions<User>,
  ) {
    return this.userModel.findOne(filter, projection, options);
  }
}
