import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  sender: string;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}