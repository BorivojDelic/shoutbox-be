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
      },
      relations: ['files'],
    });
  }

  async create(
    message: string,
    userIp: string,
    userAgent: string,
  ): Promise<MessageEntity> {
    const newMessage = this.messageRepository.create({
      userIp: userIp,
      userAgent: userAgent,
      message: message,
    });
    const created = await this.messageRepository.save(newMessage);

    // delete old message if needed
    const messages = await this.messageRepository.find({
      order: { createdAt: 'asc' },
    });

    if (messages.length > 10) {
      const oldMessages = messages.slice(0, messages.length - 10);
      await this.messageRepository.remove(oldMessages);
    }

    return created;
  }
}
