import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { contentParser } from 'fastify-multer';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const config = app.get<ConfigService>(ConfigService);
  app.enableCors();

  await app.register(contentParser);

  const configSwagger = new DocumentBuilder()
    .setTitle('Smart Pet App')
    .setDescription('The Smart Pet App API description')
    .setVersion('1.0')
    .addTag('smart-pet-app')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter(config));

  // const redisIoAdapter = new RedisIoAdapter(app, config);
  // await redisIoAdapter.connectToRedis();

  // app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
