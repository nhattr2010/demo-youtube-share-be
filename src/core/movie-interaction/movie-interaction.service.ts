import { Inject, Injectable } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { MovieEntity } from '../../model/movie.entity';
import { CreateMovieInteractionDto } from './dto/create-movie-interaction.dto';
import { IMovieInteractionRepository } from '../../repository/movie-interaction.repository';

export interface IMovieInteractionService {
  create(createMovieDto: CreateMovieInteractionDto): Promise<any>;

  findAll(offset: number, limit: number): Promise<any>;

  findByUserAndMovies(userId: string, movies: string[]): Promise<any>;
}

@Injectable()
export class MovieInteractionService implements IMovieInteractionService {
  constructor(
    @Inject('IMovieInteractionRepository')
    private readonly movieInteractionRepository: IMovieInteractionRepository,
  ) {}

  async create(
    createMovieInteractionDto: CreateMovieInteractionDto,
  ): Promise<any> {
    return await this.movieInteractionRepository.createMovieInteraction(
      createMovieInteractionDto,
    );
  }

  async findAll(offset: number, limit: number): Promise<any> {
    const conditions: FilterQuery<MovieEntity> = {};
    const sorts = {
      createdAt: -1,
    };
    const interactions = await this.movieInteractionRepository.findByConditions(
      conditions,
      sorts,
      offset,
      limit,
    );
    const totalRecord =
      await this.movieInteractionRepository.countTotalByConditions(conditions);
    return { interactions, totalRecord };
  }

  async findByUserAndMovies(userId: string, movies: string[]): Promise<any> {
    const conditions: FilterQuery<MovieEntity> = {
      user: new Types.ObjectId(userId),
      movie: { $in: movies.map((movie) => new Types.ObjectId(movie)) },
    };
    return await this.movieInteractionRepository.findAll(conditions);
  }
}
