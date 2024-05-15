import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.enableCors({
    origin: ['*'],
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('swagger test')
    .setDescription('this is the test of swagger api')
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, doc);

  await app.listen(4220);
}
bootstrap();
