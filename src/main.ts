import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors({
    origin: ['http://www.finds.nyc', 'https://www.finds.nyc'],
    methods: ['GET', 'POST'],
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.use(passport.initialize());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Finds')
    .setDescription('The Finds API description')
    .setVersion('1.0')
    .addTag('finds')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
