import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_DATABASE } from './config/database';
import configs from './config';
import { UserModule } from './core/users/user.module';
import { MovieModule } from './core/movie/movie.module';
import { MovieInteractionModule } from './core/movie-interaction/movie-interaction.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get(CONFIG_DATABASE),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true, load: configs }),
    UserModule,
    MovieModule,
    MovieInteractionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
