import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieInteractionRepository } from '../../repository/movie-interaction.repository';
import { MovieInteractionService } from './movie-interaction.service';
import { MovieInteractionController } from './movie-interaction.controller';
import { MovieModule } from '../movie/movie.module';
import {
  MovieInteractionEntity,
  MovieInteractionSchema,
} from '../../model/movie-interaction.entity';

@Module({
  imports: [
    MovieModule,
    MongooseModule.forFeature([
      { name: MovieInteractionEntity.name, schema: MovieInteractionSchema },
    ]),
  ],
  controllers: [MovieInteractionController],
  providers: [
    MovieInteractionService,
    {
      provide: 'IMovieInteractionRepository',
      useClass: MovieInteractionRepository,
    },
  ],
})
export class MovieInteractionModule {}
