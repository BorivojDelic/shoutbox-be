import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../config/database.module';
import { MessageModule } from '../message/message.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [DatabaseModule, MessageModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
