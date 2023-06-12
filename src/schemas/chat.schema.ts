import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDocument } from './user.schema';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Chat {
  @Prop({
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  })
  user1: UserDocument;

  @Prop({
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  })
  user2: UserDocument;

  @Prop({
    type: Array,
    default: [],
  })
  messages: Array<any>;

  @Prop({
    type: String,
    default: '',
  })
  lastMessage: string;
}

export type ChatDocument = Chat & Document;

const ChatSchema = SchemaFactory.createForClass(Chat);

export { ChatSchema };
