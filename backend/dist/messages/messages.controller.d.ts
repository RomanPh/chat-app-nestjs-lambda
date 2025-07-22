import { MessagesService } from './messages.service';
export declare class MessagesController {
    private service;
    constructor(service: MessagesService);
    getMessages(limit?: number, offset?: number): Promise<import("./messages.entity").Message[]>;
}
