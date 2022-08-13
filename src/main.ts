import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, ConfigType } from '@nestjs/config';
import AppConfig, { CONFIG_APP } from './config/app';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<ConfigType<typeof AppConfig>>(CONFIG_APP);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api');
  await app.listen(appConfig?.port ?? 3000, appConfig?.host ?? 'localhost');
  console.debug(`App is listening on ${appConfig?.host}:${appConfig?.port}`);
}

bootstrap();
