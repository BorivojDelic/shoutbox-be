import { ValidationError } from '../../exceptions/validation.exception';

export class FailedResponseDto {
  errorMessage: string;

  errors?: ValidationError;

  errorType?: string;
}
