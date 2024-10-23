import { v4 as uuidV4 } from 'uuid';
import { Type } from 'class-transformer';
import mongoose, { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({
  timestamps: true,
  collection: 'users',
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
export class User {
  @Prop({
    type: MongooseSchema.Types.String,
    default: function genUUID() {
      return uuidV4();
    },
  })
  _id: string;

  // @Prop({ type: MongooseSchema.Types.String, required: false, unique: false })
  // ip: string;

  // //BASE INFO
  // @Prop({ type: MongooseSchema.Types.Number, required: true, unique: true })
  // telegramId: number;

  @Type(() => Date)
  createdAt: Date;
}

const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('balance', {
//   type: String,
//   ref: 'balances',
//   localField: '_id',
//   foreignField: 'user',
// });

UserSchema.index({ user: 1, createdAt: -1 }, { unique: false, sparse: true });

export { UserSchema };
