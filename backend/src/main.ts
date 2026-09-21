import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { ApiExceptionFilter } from './common/api-exception.filter';
import { ResponseInterceptor } from './common/response.interceptor';

import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.use('/public', express.static(join(process.cwd(), 'public')));
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new ApiExceptionFilter());
  app.setGlobalPrefix('api', { exclude: ['', 'health', 'docs', 'docs-json'] });
  const config = new DocumentBuilder()
    .setTitle('Smart Space Booking API')
    .setVersion('1.0')
    .addServer('http://localhost:3001', 'NestJS Backend (Port 3001)')
    .addServer('http://localhost:3000', 'Frontend Proxy (Port 3000)')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  SwaggerModule.setup('api/docs', app, document);
  const port = process.env.PORT ?? 3000;
  console.log(`Starting server on port ${port}...`);
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
