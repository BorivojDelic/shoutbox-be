import { Controller, Get } from '@nestjs/common';

import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messagesService: MessageService) {}

  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }
}
