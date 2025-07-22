import { Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) {}

  @Get()
  getMessages(@Query('limit') limit = 50, @Query('offset') offset = 0) {
    return this.service.getAll(+limit, +offset);
  }
}
