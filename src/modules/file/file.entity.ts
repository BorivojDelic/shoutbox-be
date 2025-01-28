import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { MessageEntity } from '../message/message.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column({ nullable: true })
  messageId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => MessageEntity, (message) => message.files, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'messageId', referencedColumnName: 'id' })
  @Exclude()
  message: MessageEntity;
}
