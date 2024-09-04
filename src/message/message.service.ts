import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async saveMessage(user: string, sender: string, message: string): Promise<Message> {
    console.log({ user: user, sender: sender, message: message });
    
    const newMessage = this.messageRepository.create({ user: user, sender: sender, message: message });
    return await this.messageRepository.save(newMessage);
  }

  // Método adicional para obtener mensajes si es necesario
  async getAllMessages(): Promise<Message[]> {
    return this.messageRepository.find();
  }
}