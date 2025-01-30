import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { FileType } from '../../shared/DTOs/file.dto';
import { FileEntity } from '../file/file.entity';
import { MESSAGES_LIMIT } from '../../shared/constants/global.constants';
import { MessageGateway } from './message.gateway';

@Injectable()
export class MessageService {
  private messageLimit = MESSAGES_LIMIT;

  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(FileEntity)
    private readonly fileEntityRepository: Repository<FileEntity>,
    private readonly messageGateway: MessageGateway,
  ) {}

  async findAll(): Promise<MessageEntity[]> {
    const messages = await this.messageRepository.find({
      order: { createdAt: 'DESC' },
      take: this.messageLimit,
      select: {
        id: true,
        userIp: true,
        userAgent: true,
        message: true,
        createdAt: true,
        files: { id: true },
      },
      relations: ['files'],
    });
    return messages.map((message) => ({
      ...message,
      userIp: message.userIp.replace('::ffff:', ''),
    }));
  }

  async create(
    message: string,
    userIp: string,
    userAgent: string,
    files: FileType[],
  ): Promise<MessageEntity> {
    const newMessage = this.messageRepository.create({
      userIp: userIp,
      userAgent: userAgent,
      message: message,
    });

    const created = await this.messageRepository.save(newMessage);

    if (files.length) {
      const newFiles = [];
      for (const file of files) {
        newFiles.push(
          this.fileEntityRepository.create({
            name: file.originalname,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
            message: created,
          }),
        );
      }
      await this.fileEntityRepository.save(newFiles);
    }

    // delete old message if needed
    const messages = await this.messageRepository.find({
      order: { createdAt: 'asc' },
    });

    if (messages.length > 10) {
      const oldMessages = messages.slice(0, messages.length - 10);
      await this.messageRepository.remove(oldMessages);
    }

    this.findAll().then((messages) => {
      this.messageGateway.sendMessages(messages);
    });

    return created;
  }
}
