import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group{
    @Prop({
        type:String,
        required:true,
        unique:true
    })
    name: string

    @Prop({
        type:String,
        required:true,
    })
    description: string
}

export const GroupSchema = SchemaFactory.createForClass(Group);