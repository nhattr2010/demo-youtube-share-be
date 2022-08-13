import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export type MovieDocument = MovieEntity & Document;

@Schema({ collection: 'movie' })
export class MovieEntity {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  url: string;

  @ApiProperty()
  @Prop()
  thumbUp: number;

  @ApiProperty()
  @Prop()
  thumbDown: number;

  @ApiProperty()
  @Prop()
  createdTime: string;

  @ApiProperty()
  @Prop()
  createdTimeMs: number;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: UserEntity.name })
  createdBy: Types.ObjectId;

  @ApiProperty()
  @Prop()
  createdAt: number;

  @ApiProperty()
  @Prop()
  updatedAt: number;
}

export const MovieSchema = SchemaFactory.createForClass(MovieEntity);
