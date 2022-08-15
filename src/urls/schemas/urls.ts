import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Schemas } from 'mongoose';

export type UrlDocument = Url & Document;

@Schema({ timestamps: true})
export class Url {
  @Prop({type: Schemas.Types.String})
  originalUrl: string;

  @Prop({type: Schemas.Types.String})
  shortUrl: string;

}

export const UrlSchema = SchemaFactory.createForClass(Url);