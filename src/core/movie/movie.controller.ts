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
import { CreateMovieDto } from './dto/create-movie.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { MovieEntity } from '../../model/movie.entity';

@Controller('/api/v1/movie')
@ApiTags('movie')
export class MovieController {
  private readonly logger = new Logger(MovieController.name);

  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiOkResponse({ type: MovieEntity })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async createNewPage(
    @Body() createMovieDto: CreateMovieDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(
        `create new movie with information: ${JSON.stringify(createMovieDto)}`,
      );
      await this.movieService.create(createMovieDto);
      res.status(HttpStatus.OK).send({
        status: 200,
        message: 'success',
      });
    } catch (err) {
      this.logger.error(`create new movie failed with error ${err}`);
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
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Res() res: Response,
  ) {
    try {
      const movie = await this.movieService.findAll(offset, limit);
      res.status(HttpStatus.OK).send(movie);
    } catch (err) {
      this.logger.log(`find all movie failed with error ${err}`);
      res.status(HttpStatus.FORBIDDEN).send({
        status: 403,
        message: 'Exception error!',
      });
    }
  }
}
