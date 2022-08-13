import { Inject, Injectable, Logger } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { MovieEntity } from '../../model/movie.entity';
import { CreateMovieInteractionDto } from './dto/create-movie-interaction.dto';
import { IMovieInteractionRepository } from '../../repository/movie-interaction.repository';

export interface IMovieInteractionService {
  create(createMovieDto: CreateMovieInteractionDto): Promise<any>;

  findAll(offset: number, limit: number): Promise<any>;
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
      createdTime: -1,
    };
    const posts = await this.movieInteractionRepository.findByConditions(
      conditions,
      sorts,
      offset,
      limit,
    );
    const totalRecord =
      await this.movieInteractionRepository.countTotalByConditions(conditions);
    return { posts, totalRecord };
  }
}
