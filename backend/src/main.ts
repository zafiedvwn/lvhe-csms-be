import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });

}
bootstrap();
