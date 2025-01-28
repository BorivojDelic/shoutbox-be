import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '../message/message.entity';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 3306),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [MessageEntity],
      synchronize: true, // Development Only, Migrations for production
    }),
  ],
})
export class DatabaseModule {}
