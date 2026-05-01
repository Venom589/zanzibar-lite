import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type ListDocument = List & Document;

@Schema({ timestamps: true })
export class List{
    _id: string;

    @Prop({
        required: true
    })
    title: string;
    
    @Prop({
        required: true
    })
    description: string;

    @Prop({
        default: false
    })
    completed: boolean;

}

export const ListSchema = SchemaFactory.createForClass(List);