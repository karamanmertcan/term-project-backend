import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';
import { User } from 'src/schemas/user.schema';
import { AppGateway } from '../websocket/websocket.gateway';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly websocketGateway: AppGateway,
  ) {}

  sendMessage(senderId: string, receiverId: string, message: string) {
    this.websocketGateway.server.to(`user_room:${receiverId}`).emit('MESSAGE', {
      message: message,
      senderId: senderId,
      receiverId: receiverId,
    });
  }
}
