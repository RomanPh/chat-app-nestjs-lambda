import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';
export declare class ChatGateway implements OnGatewayInit {
    private readonly messagesService;
    private io;
    constructor(messagesService: MessagesService);
    afterInit(server: Server): void;
    handleMessage(data: {
        userId: string;
        content: string;
    }): Promise<void>;
    handleGetLatest({ limit }: {
        limit: number;
    }): Promise<{
        messages: Message[];
        total: number;
    }>;
    handleGetHistory({ limit, offset }: {
        limit: number;
        offset: number;
    }): Promise<Message[]>;
}
