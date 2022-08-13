import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MovieEntity } from './movie.entity';

export type UserDocument = UserEntity & Document;

@Schema({ collection: 'user' })
export class UserEntity {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  createdAt: number;

  @ApiProperty()
  @Prop()
  updatedAt: number;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
