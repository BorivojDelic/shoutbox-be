import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
} from '@nestjs/common';

import { MyLogger } from '../modules/logger/logger.service';
import { SERVER_ERROR } from '../shared/constants/strings.constants';
import { FailedResponseDto } from '../shared/DTOs/failed-response.dto';

@Catch()
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost): void {
    const logger = new MyLogger();
    logger.setContext('InternalServerErrorException');

    const response = host.switchToHttp().getResponse();

    logger.error(JSON.stringify(exception.message));

    const resp: FailedResponseDto = {
      errorMessage: exception.message,
    };

    if (process.env.NODE_ENV === 'production') {
      resp.errorMessage = SERVER_ERROR;
    } else {
      resp.errorType = exception.name;
    }

    response.status(500).json(resp);
  }
}
