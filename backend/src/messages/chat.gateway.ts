import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer()
  private io: Server;

  constructor(private readonly messagesService: MessagesService) {}

  afterInit(server: Server) {
    console.log('✅ WebSocket initialized');
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: { userId: string; content: string },
  ): Promise<void> {
    const processed = await this.messagesService.processMessageViaLambda(data);
    const saved = await this.messagesService.saveMessage(processed);
    this.io.emit('message', saved);
  }

  @SubscribeMessage('get_latest')
  async handleGetLatest(
    @MessageBody() { limit }: { limit: number },
  ): Promise<{ messages: Message[]; total: number }> {
    const total = await this.messagesService.countAll();
    const offset = 0;

    const messages = await this.messagesService.getAll(limit, offset);
    return { messages, total };
  }

  @SubscribeMessage('get_history')
  async handleGetHistory(
    @MessageBody() { limit, offset }: { limit: number; offset: number },
  ): Promise<Message[]> {
    const messages = await this.messagesService.getAll(limit, offset);
    return messages;
  }
}
