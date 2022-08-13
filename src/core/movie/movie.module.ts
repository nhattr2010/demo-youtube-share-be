import { MovieController } from './movie.controller';
import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieEntity, MovieSchema } from '../../model/movie.entity';
import { MovieRepository } from '../../repository/movie.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MovieEntity.name, schema: MovieSchema },
    ]),
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    {
      provide: 'IMovieRepository',
      useClass: MovieRepository,
    },
  ],
  exports: [MovieService],
})
export class MovieModule {}
