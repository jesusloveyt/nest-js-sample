import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      excludeExtraneousValues: true,
    },
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get('Reflector')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
