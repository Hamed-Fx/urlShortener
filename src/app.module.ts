import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsModule } from './urls/urls.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UrlsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/urls')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
