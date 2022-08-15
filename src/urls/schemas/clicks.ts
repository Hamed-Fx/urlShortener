import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';

export type ClickDocument = Click & Document;

@Schema({ timestamps: true})
export class Click {
  @Prop({type: Schemas.Types.String})
  originalUrl: string;

  @Prop({type: Schemas.Types.String})
  shortUrl: string;
}

export const ClickSchema = SchemaFactory.createForClass(Click);