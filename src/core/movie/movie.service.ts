import { Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterQuery, Types } from 'mongoose';
import { MovieEntity } from '../../model/movie.entity';
import { CreateMovieInteractionDto } from '../movie-interaction/dto/create-movie-interaction.dto';
import { MovieRepository } from '../../repository/movie.repository';

export interface IMoviesService {
  create(createMovieDto: CreateMovieDto): Promise<any>;

  findAll(offset: number, limit: number): Promise<any>;

  handleNewInteraction(
    createMovieInteractionDto: CreateMovieInteractionDto,
  ): Promise<any>;
}

@Injectable()
export class MovieService implements IMoviesService {
  constructor(
    @Inject('IMovieRepository')
    private readonly movieRepository: MovieRepository,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<any> {
    return await this.movieRepository.createMovie(createMovieDto);
  }

  async findAll(offset: number, limit: number): Promise<any> {
    const conditions: FilterQuery<MovieEntity> = {};
    const sorts = {
      createdAt: -1,
    };
    const movies = await this.movieRepository.findByConditions(
      conditions,
      sorts,
      offset,
      limit,
    );
    const totalRecord = await this.movieRepository.countTotalByConditions(
      conditions,
    );
    return { movies, totalRecord };
  }

  async handleNewInteraction(
    createMovieInteractionDto: CreateMovieInteractionDto,
  ): Promise<any> {
    const movie = await this.movieRepository.findOne({
      _id: new Types.ObjectId(createMovieInteractionDto.movie),
    });
    if (!movie) {
      throw new Error('Movie not found');
    }
    if (createMovieInteractionDto.value === 1) {
      movie.thumbUp += 1;
    } else {
      movie.thumbDown += 1;
    }
    await this.movieRepository.update(movie);
    return movie;
  }
}
