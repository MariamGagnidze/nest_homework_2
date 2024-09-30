import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [{ name: String, amount: Number }], default: [] })
  expenses: { name: string; amount: number }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
