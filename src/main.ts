import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express'; // Import express for static assets

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Corrected line: Serve the 'public' directory statically.
  // The 'uploads' part of the path will be handled by the file's relative path itself.
  app.use(
    '/uploads',
    express.static(join(__dirname, '..', 'public', 'uploads')),
  );

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
