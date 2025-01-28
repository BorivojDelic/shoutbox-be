import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
