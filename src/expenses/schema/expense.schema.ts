import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Expense extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    amount: number;

    @Prop()
    description: string; 

    @Prop({ required: true, type: Date })
    date: Date; 
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
