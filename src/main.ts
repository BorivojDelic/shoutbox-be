import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { useContainer } from 'class-validator';
import { TrimBodyPipe } from './shared/transformers/dto-property.transformer';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { ValidationException } from './exceptions/validation.exception';
import { mapErrorMessagesFromValidator } from './shared/helpers';
import { ValidationFilter } from './exceptions/validation.filter';
import { QueryFailedExceptionFilter } from './exceptions/query-failed.exception';
import { BadRequestExceptionFilter } from './exceptions/bad-request.exception';
import { HttpExceptionFilter } from './exceptions/http.exception';
import { InternalServerErrorExceptionFilter } from './exceptions/internal-server-error.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.setGlobalPrefix('/api');

  app.useGlobalFilters(
    new InternalServerErrorExceptionFilter(),
    new HttpExceptionFilter(),
    new BadRequestExceptionFilter(),
    new QueryFailedExceptionFilter(),
    new ValidationFilter(),
  );

  // TrimPipe should be before ValidationPipe, to provide trimmed values
  app.useGlobalPipes(
    new TrimBodyPipe(),
    new ValidationPipe({
      whitelist: true,
      validationError: { target: false },
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(
          errors.reduce(mapErrorMessagesFromValidator, {}),
        );
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
