import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { Url, UrlSchema } from './schemas/urls';
import { Click, ClickSchema } from './schemas/clicks';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [UrlsController],
  imports: [
    MongooseModule.forFeature([
      { name: Url.name, schema: UrlSchema },
      { name: Click.name, schema: ClickSchema }
    ])
  ],
  providers: [UrlsService]
})
export class UrlsModule {}
