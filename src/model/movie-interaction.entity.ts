import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { MovieEntity } from './movie.entity';

export type MovieInteractionDocument = MovieInteractionEntity & Document;

@Schema({ collection: 'movie-interaction' })
export class MovieInteractionEntity {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: MovieEntity.name })
  movie: Types.ObjectId;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: UserEntity.name })
  user: Types.ObjectId;

  @ApiProperty()
  @Prop()
  createdAt: number;

  @ApiProperty()
  @Prop()
  updatedAt: number;
}

export const MovieInteractionSchema = SchemaFactory.createForClass(MovieEntity);
