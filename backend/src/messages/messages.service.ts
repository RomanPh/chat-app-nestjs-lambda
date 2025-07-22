import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './messages.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

interface ProcessedMessage {
  userId: string;
  content: string;
}

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private repo: Repository<Message>,
  ) {}

  async processMessageViaLambda(message: {
    userId: string;
    content: string;
  }): Promise<ProcessedMessage> {
    const response = await axios.post<ProcessedMessage>(
      process.env.LAMBDA_ENDPOINT!,
      message,
    );

    return response.data;
  }

  async saveMessage(message: Partial<Message>) {
    const saved = this.repo.create(message);

    return this.repo.save(saved);
  }

  async getAll(limit: number, offset: number): Promise<Message[]> {
    const messages = await this.repo.find({
      order: { timestamp: 'DESC' },
      skip: offset,
      take: limit,
    });

    return messages;
  }

  async countAll(): Promise<number> {
    const count = await this.repo.count();

    return count;
  }
}
