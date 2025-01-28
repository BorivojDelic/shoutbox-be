import { IsOptional, MinLength } from 'class-validator';
import { FileType } from '../../shared/DTOs/file.dto';

export class CreateMessageDto {
  @MinLength(10, { message: 'Message must be at least 10 characters long' })
  readonly message: string;

  @IsOptional()
  files?: FileType[];
}
