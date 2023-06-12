import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AddMatchUser,
  AddMatchUserSchema,
} from 'src/schemas/add-match-user.schema';
import { Chat, ChatSchema } from 'src/schemas/chat.schema';
import { LikeUser, LikeUserSchema } from 'src/schemas/like-user.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { WebsocketModule } from '../websocket/websocket.module';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LikeUser.name, schema: LikeUserSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([
      { name: AddMatchUser.name, schema: AddMatchUserSchema },
    ]),

    WebsocketModule,
  ],
  exports: [MatchService],
  providers: [MatchService],
  controllers: [MatchController],
})
export class MatchModule {}
