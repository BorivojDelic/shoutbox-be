import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { MyLogger } from '../modules/logger/logger.service';
import { FailedResponseDto } from '../shared/DTOs/failed-response.dto';

interface QueryFailedException extends Error {
  code: string;
  message: string;
}

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const next = ctx.getNext();

    if (process.env.NODE_ENV === 'production') {
      next(new InternalServerErrorException(exception));
      return;
    }

    const response = ctx.getResponse<Response>();
    const statusCode = 500;

    const errorType = 'Internal Server Error';

    const logger = new MyLogger();
    logger.setContext('QueryFailedException');
    logger.error(exception.code);
    logger.error(JSON.stringify(exception.message));

    const resp: FailedResponseDto = {
      errorMessage: exception.message,
      errorType: errorType,
    };

    response.status(statusCode).json(resp);
  }
}
