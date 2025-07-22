import { Message } from './messages.entity';
import { Repository } from 'typeorm';
interface ProcessedMessage {
    userId: string;
    content: string;
}
export declare class MessagesService {
    private repo;
    constructor(repo: Repository<Message>);
    processMessageViaLambda(message: {
        userId: string;
        content: string;
    }): Promise<ProcessedMessage>;
    saveMessage(message: Partial<Message>): Promise<Message>;
    getAll(limit: number, offset: number): Promise<Message[]>;
    countAll(): Promise<number>;
}
export {};
