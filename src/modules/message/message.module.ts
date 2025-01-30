import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { MessageEntity } from './message.entity';
import { FileEntity } from '../file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, FileEntity])],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
