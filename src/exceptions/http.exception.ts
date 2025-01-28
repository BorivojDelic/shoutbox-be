import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

import { MyLogger } from '../modules/logger/logger.service';
import { FailedResponseDto } from '../shared/DTOs/failed-response.dto';

import { InternalServerErrorExceptionFilter } from './internal-server-error.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const logger = new MyLogger();
    logger.setContext('HttpException');

    const status = exception.getStatus();

    if (status >= 500) {
      new InternalServerErrorExceptionFilter().catch(exception, host);
      return;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    logger.error(JSON.stringify(exception.message));
    const resp: FailedResponseDto = {
      errorMessage: exception.message,
    };

    response.status(status).json(resp);
  }
}
