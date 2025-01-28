import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from './message.entity';
import { FileEntity } from '../file/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, FileEntity])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
