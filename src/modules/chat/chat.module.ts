import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { UserModule } from '../user/user.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    WebsocketModule,
  ],
  exports: [ChatService],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
