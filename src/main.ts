import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Movie Review Site')
    .setDescription('영화에 대한 리뷰를 남길 수 있는 서비스입니다.')
    .setVersion('0.01')
    .addTag('movies')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // dto에 정의되지 않은 속성 있으면 400에러 처리
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
