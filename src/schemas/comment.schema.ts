import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Comment extends mongoose.Document {
  @Prop({
    required: true,
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  })
  user: User;

  @Prop({
    required: true,
    type: String,
  })
  content: string;

  //yeniden bakılabilir
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Forum',
    required: true,
  })
  postId: mongoose.Schema.Types.ObjectId;

  //yeniden bakılabilir
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  })
  parentCommentId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: mongoose.now })
  createdAt: Date;

  @Prop({ default: mongoose.now })
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
