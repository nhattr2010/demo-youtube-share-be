import { Injectable } from '@nestjs/common';
import { Connection, FilterQuery, Model, Types } from 'mongoose';
import * as moment from 'moment';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateMovieInteractionDto } from 'src/core/movie-interaction/dto/create-movie-interaction.dto';
import {
  MovieInteractionDocument,
  MovieInteractionEntity,
} from '../model/movie-interaction.entity';

export interface IMovieInteractionRepository {
  createMovieInteraction(
    createMovieDto: CreateMovieInteractionDto,
  ): Promise<any>;

  findAll(
    conditions?: FilterQuery<MovieInteractionEntity>,
  ): Promise<Array<MovieInteractionEntity>>;

  findByConditions(
    conditions: FilterQuery<MovieInteractionEntity>,
    sorts: any,
    offset: number,
    limit: number,
  ): Promise<Array<MovieInteractionEntity>>;

  countTotalByConditions(
    conditions: FilterQuery<MovieInteractionEntity>,
  ): Promise<number>;
}

@Injectable()
export class MovieInteractionRepository implements IMovieInteractionRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(MovieInteractionEntity.name)
    private readonly movieInteractionModal: Model<MovieInteractionDocument>,
  ) {}

  async createMovieInteraction(
    createMovieInteractionDto: CreateMovieInteractionDto,
  ): Promise<any> {
    const movie = new this.movieInteractionModal({
      movie: new Types.ObjectId(createMovieInteractionDto.movie),
      user: new Types.ObjectId(createMovieInteractionDto.user),
      value: createMovieInteractionDto.value,
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });
    return movie.save();
  }

  async findAll(
    conditions?: FilterQuery<MovieInteractionEntity>,
  ): Promise<Array<MovieInteractionEntity>> {
    return await this.movieInteractionModal
      .find(conditions)
      .sort({
        createdAt: -1,
      })
      .exec();
  }

  async findByConditions(
    conditions: FilterQuery<MovieInteractionEntity>,
    sorts: any,
    offset: number,
    limit: number,
  ): Promise<Array<MovieInteractionEntity>> {
    const result = await this.movieInteractionModal
      .find(conditions)
      .sort(sorts)
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  }

  async countTotalByConditions(
    conditions: FilterQuery<MovieInteractionEntity>,
  ): Promise<number> {
    return this.movieInteractionModal.countDocuments(conditions);
  }
}
