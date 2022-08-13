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

  findAll(): Promise<Array<MovieInteractionEntity>>;

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
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });
    return movie.save();
  }

  async findAll(): Promise<Array<MovieInteractionEntity>> {
    return await this.movieInteractionModal
      .find({})
      .populate('createdBy')
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
      .populate('createdBy')
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

@Injectable()
export class MockMovieInteractionRepository extends MovieInteractionRepository {
  async findAll(): Promise<Array<MovieInteractionEntity>> {
    const posts: Array<any> = [
      {
        _id: '5fb0b7cd9beb6552ea44e2ac',
        user: {
          _id: '5fb0b0ab9118713adf2dd902',
          email: 'test_email@gmail.com',
          createdAt: 1605415083322,
          updatedAt: 1605415083322,
          __v: 0,
        },
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        createdAt: 1605416909592,
        updatedAt: 1605416909593,
        __v: 0,
      },
      {
        _id: '5fb0b7cd9beb6552ea44e2ac',
        user: {
          _id: '5fb0b0ab9118713adf2dd902',
          email: 'test_email@gmail.com',
          createdAt: 1605415083322,
          updatedAt: 1605415083322,
          __v: 0,
        },
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        createdAt: 1605416909592,
        updatedAt: 1605416909593,
        __v: 0,
      },
    ];
    return posts;
  }
}
