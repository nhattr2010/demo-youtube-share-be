import { MovieDocument, MovieEntity } from '../model/movie.entity';
import { Injectable } from '@nestjs/common';
import { Connection, FilterQuery, Model, Types } from 'mongoose';
import * as moment from 'moment';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateMovieDto } from 'src/core/movie/dto/create-movie.dto';

export interface IMovieRepository {
  createMovie(createMovieDto: CreateMovieDto): Promise<any>;

  findOne(conditions: FilterQuery<MovieEntity>): Promise<MovieEntity>;

  findAll(): Promise<Array<MovieEntity>>;

  findByConditions(
    conditions: FilterQuery<MovieEntity>,
    sorts: any,
    offset: number,
    limit: number,
  ): Promise<Array<MovieEntity>>;

  countTotalByConditions(conditions: FilterQuery<MovieEntity>): Promise<number>;

  update(movieEntity: MovieEntity): Promise<any>;
}

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(MovieEntity.name)
    private readonly movieModal: Model<MovieDocument>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<any> {
    const movie = new this.movieModal({
      url: createMovieDto.url,
      title: createMovieDto.title || 'Lorem ipsum',
      description:
        createMovieDto.description ||
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
      createdBy: new Types.ObjectId(createMovieDto.createdBy),
      thumbUp: 0,
      thumbDown: 0,
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    });
    return movie.save();
  }

  async findAll(): Promise<Array<MovieEntity>> {
    return await this.movieModal
      .find({})
      .populate('createdBy')
      .sort({
        createdAt: -1,
      })
      .exec();
  }

  async findByConditions(
    conditions: FilterQuery<MovieEntity>,
    sorts: any,
    offset: number,
    limit: number,
  ): Promise<Array<MovieEntity>> {
    const result = await this.movieModal
      .find(conditions)
      .populate('createdBy', '-password')
      .sort(sorts)
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  }

  async findOne(conditions: FilterQuery<MovieEntity>): Promise<MovieDocument> {
    return this.movieModal.findOne(conditions).lean();
  }

  async countTotalByConditions(
    conditions: FilterQuery<MovieEntity>,
  ): Promise<number> {
    return this.movieModal.countDocuments(conditions);
  }

  async update(movieEntity: MovieEntity): Promise<any> {
    return await this.movieModal
      .updateOne(
        {
          _id: new Types.ObjectId(movieEntity._id),
        },
        {
          ...movieEntity,
          updatedAt: moment().valueOf(),
        },
      )
      .exec();
  }
}
