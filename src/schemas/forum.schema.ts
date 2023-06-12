import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class Forum {
  @Prop({
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  })
  user: User;

  @Prop({
    type: String,
    required: true,
  })
  content: string;

  @Prop()
  categorie: Categories;

  @Prop({
    type: Array,
    ref: 'User',
    default: [],
  })
  likes: Array<User>;

  @Prop({
    type: [CommentSchema],
    default: [],
  })
  comments: mongoose.Types.Array<Comment>;

  @Prop({
    type: Object,
    required: true,
    default: [],
  })
  categories: Array<string>;

  @Prop({
    type: String,
  })
  image: string;
}

export enum Categories {
  Cat = 'Cat', //or User = "user",
  Dog = 'Dog',
  Birds = 'Birds',
  Rabbits = 'Rabbits',
  Fish = 'Fish',
  Parrots = 'Parrots',
  Hamsters = 'Hamsters',
  Others = 'Others',
  // or Admin = "admin",
}

export type ForumDocument = Forum & Document;

const ForumSchema = SchemaFactory.createForClass(Forum);

export { ForumSchema };
