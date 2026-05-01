import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RelationDocument = Relation & Document

@Schema({ timestamps: true })
export class Relation {

  @Prop({ required: true, index: true })
  subject: string;

  @Prop({ required: true, index: true })
  relation: string;

  @Prop({ required: true, index: true })
  resource: string;
}

export const RelationSchema = SchemaFactory.createForClass(Relation);

RelationSchema.index(
  { subject: 1, relation: 1, resource: 1 },
  { unique: true }
);