import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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

  @Column({ length: 255, nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
