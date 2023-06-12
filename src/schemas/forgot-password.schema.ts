import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class ForgotPassword {
  @Prop({
    type: String,
    unique: true,
    required:true,
  })
  code: string;
  @Prop({
    type: Boolean,
    default:false
  })
  isUsed: Boolean;
}

export type ForgotPasswordDocument = ForgotPassword & Document;

const ForgotPasswordSchema = SchemaFactory.createForClass(ForgotPassword);

export { ForgotPasswordSchema };
