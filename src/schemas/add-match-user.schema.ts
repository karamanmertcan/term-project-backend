/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class AddMatchUser {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: mongoose.Schema.Types.ObjectId;

  

  @Prop({
    type: Array,
    required: true,
  })
  photoURL: Array<string>;

  @Prop({
    type: Object,
  })
  location: object;

  @Prop({
    type: String,
    required: true,
  })
  petDescription: string;

  @Prop({
    type: String,
    required: true,
  })
  age: string;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  species: string;
}

export type AddMatchUserDocument = AddMatchUser & Document;

const AddMatchUserSchema = SchemaFactory.createForClass(AddMatchUser);

export { AddMatchUserSchema };
