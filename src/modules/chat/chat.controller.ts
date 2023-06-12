import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('send')
  sendMessage(@Body() body: any) {
    this.chatService.sendMessage(body.senderId, body.receiverId, body.message);
  }
}
