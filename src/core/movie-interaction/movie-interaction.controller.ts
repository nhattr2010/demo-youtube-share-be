import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MovieEntity } from '../../model/movie.entity';
import { MovieInteractionService } from './movie-interaction.service';
import { CreateMovieInteractionDto } from './dto/create-movie-interaction.dto';
import { MovieService } from '../movie/movie.service';
import { GetMovieInteractionDto } from './dto/get-movie-interaction-by-user.dto';

@Controller('/v1/movie-interaction')
@ApiTags('movie')
export class MovieInteractionController {
  private readonly logger = new Logger(MovieInteractionController.name);

  constructor(
    private readonly movieInteractionService: MovieInteractionService,
    private readonly movieService: MovieService,
  ) {}

  @Post()
  @ApiOkResponse({ type: MovieEntity })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async createNewPage(
    @Body() createMovieInteractionDto: CreateMovieInteractionDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(
        `create new movie interaction with information: ${JSON.stringify(
          createMovieInteractionDto,
        )}`,
      );
      const interaction = await this.movieInteractionService.create(
        createMovieInteractionDto,
      );
      const movie = await this.movieService.handleNewInteraction(
        createMovieInteractionDto,
      );
      res.status(HttpStatus.OK).send({
        status: 200,
        message: 'success',
        data: { interaction, movie },
      });
    } catch (err) {
      this.logger.error(
        `create new movie interaction failed with error ${err}`,
      );
      res.status(HttpStatus.FORBIDDEN).send({
        status: 403,
        message: 'Exception error!',
      });
    }
  }

  @Post('/all/by-user')
  @ApiOkResponse({ type: MovieEntity })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findAllByCondition(
    @Body() getMovieInteractionDto: GetMovieInteractionDto,
    @Res() res: Response,
  ) {
    try {
      const movie = await this.movieInteractionService.findByUserAndMovies(
        getMovieInteractionDto.user,
        getMovieInteractionDto.movies,
      );
      res.status(HttpStatus.OK).send({
        status: 200,
        message: 'success',
        data: movie,
      });
    } catch (err) {
      this.logger.log(`find all movie interaction failed with error ${err}`);
      res.status(HttpStatus.FORBIDDEN).send({
        status: 403,
        message: 'Exception error!',
      });
    }
  }

  @Get('/all')
  @ApiOkResponse({ type: [MovieEntity] })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findAll(
    @Query('offset', ParseIntPipe)
    offset: number,
    @Query('limit', ParseIntPipe)
    limit: number,
    @Res()
    res: Response,
  ) {
    try {
      const movie = await this.movieInteractionService.findAll(offset, limit);
      res.status(HttpStatus.OK).send(movie);
    } catch (err) {
      this.logger.log(`find all movie interaction failed with error ${err}`);
      res.status(HttpStatus.FORBIDDEN).send({
        status: 403,
        message: 'Exception error!',
      });
    }
  }
}
