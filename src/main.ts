import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors();

  app.use(passport.initialize());

  const config = new DocumentBuilder()
    .setTitle('Finds')
    .setDescription('The Finds API description')
    .setVersion('1.0')
    .addTag('finds')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(4499);
}
bootstrap();
