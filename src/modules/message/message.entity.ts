import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { FileEntity } from '../file/file.entity';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  userIp: string;

  @Column()
  userAgent: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => FileEntity, (file) => file.message)
  files: FileEntity[];
}
