import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messagesService: MessageService) {}

  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() { message }: { message: string }, @Req() req: Request) {
    const userIp = req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    return await this.messagesService.create(message, userIp, userAgent);
  }
}
