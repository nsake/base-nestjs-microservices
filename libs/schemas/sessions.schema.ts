import { v4 as uuidV4 } from 'uuid';
import { Type } from 'class-transformer';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ESchemas } from '@common/db/enums/schemas.enum';
import { User } from '@apps/user/src/user-app/schemas/user.schema';

export type SessionDocument = Session & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'sessions',
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      ret.id = doc._id;

      delete ret._id;
      delete ret.__v;

      return ret;
    },
  },

  toObject: { virtuals: true },
})
export class Session {
  @Prop({
    type: MongooseSchema.Types.String,
    default: function genUUID() {
      return uuidV4();
    },
  })
  _id: string;

  @Prop({
    ref: ESchemas.Users,
    required: false,
    default: null,
    type: MongooseSchema.Types.String,
  })
  user: User | string;

  @Prop({
    type: Date,
  })
  exp: Date;

  @Prop({
    type: String,
  })
  userAgent: string;

  @Type(() => Date)
  createdAt: Date;
}

const SessionSchema = SchemaFactory.createForClass(Session);

export { SessionSchema };
