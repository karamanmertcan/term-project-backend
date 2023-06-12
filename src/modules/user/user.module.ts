import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Advert, AdvertSchema } from 'src/schemas/advert.schema';
import { Chat, ChatSchema } from 'src/schemas/chat.schema';
import { Forum, ForumSchema } from 'src/schemas/forum.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { WebsocketModule } from '../websocket/websocket.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: Advert.name, schema: AdvertSchema }]),
    MongooseModule.forFeature([{ name: Forum.name, schema: ForumSchema }]),

    WebsocketModule,
  ],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
