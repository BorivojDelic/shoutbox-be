import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageService {
  private messageLimit = 10;

  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async findAll(): Promise<MessageEntity[]> {
    return await this.messageRepository.find({
      order: { id: 'DESC' },
      take: this.messageLimit,
      select: {
        id: true,
        message: true,
        imageUrl: true,
      },
    });
  }
}
