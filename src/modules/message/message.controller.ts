import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common/decorators/http/route-params.decorator';
import { Request } from 'express';

import { MessageService } from './message.service';
import { MULTER_UPLOAD_IMAGE_OPTIONS } from './message.constants';
import { FileType } from '../../shared/DTOs/file.dto';
import { CreateMessageDto } from './message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messagesService: MessageService) {}

  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, MULTER_UPLOAD_IMAGE_OPTIONS))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @UploadedFiles() files: FileType[],
    @Body() { message }: CreateMessageDto,
    @Req() req: Request,
  ) {
    const userIp = req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    return await this.messagesService.create(message, userIp, userAgent, files);
  }
}
