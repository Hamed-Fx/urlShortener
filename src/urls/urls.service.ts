import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url, UrlDocument } from './schemas/urls'
import { Click, ClickDocument } from './schemas/clicks'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlsService {
  constructor(
    @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
    @InjectModel(Click.name) private clickModel: Model<ClickDocument>
  ) { }

  public async shortening(
    originalUrl,
  ) {
    try {
      const baseUrl = 'http:localhost:3000'
      const shortUrl = baseUrl + '/' + nanoid(6)


      const savedUrl = await this.urlModel.findOne(
        { originalUrl },
        { __v: 0, _id: 0 }
      )
      if (savedUrl) {
        return {
          result: savedUrl,
          statusCode: 200,
          message: 'Successfully found'
        }
      }

      //todo: check if the shortUrl is unique

      const result = await this.urlModel.create({
        originalUrl,
        shortUrl,
      },
      { __v: 0, _id: 0 })

      return {
        result: result,
        statusCode: 201,
        message: 'Successfully created'
      }
    } catch (error) {
      console.log(error)
      return {
        result: error,
        statusCode: 500,
        message: 'Internal Server Error'
      }
    }

  }


  public async redirection(
    shortUrl,
    //createUrlDto: CreateUrlDto
  ) {
    try {
      const savedUrl = await this.urlModel.findOne(
        { shortUrl },
        { __v: 0, _id: 0 }
      )
      if (!savedUrl) {
        return {
          statusCode: 401,
          message: 'No url found!'
        }
      }
      const date = Date.now()

      const result = await this.clickModel.create({
        originalUrl: savedUrl.originalUrl,
        shortUrl: savedUrl.shortUrl,
      })
      return {
        result: {originalUrl: savedUrl.originalUrl},
        statusCode: 200,
        message: 'Successfully found'
      };
    } catch (error) {
      console.log(error)
      return {
        result: error,
        statusCode: 500,
        message: 'Internal Server Error'
      }
    }
  }


  public async report(timeFrame, url) {
    try {
      const savedUrl = await this.urlModel.findOne(
        { shortUrl: url },
        { createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }
      )
      if (!savedUrl) {
        return {
          statusCode: 401,
          message: 'No url found!'
        }
      }

      const requiredTimeFrame = timeFrame * 60 * 1000
      const result = await this.clickModel.find({
        shortUrl: url,
        createdAt: { $gt: new Date(Date.now() - requiredTimeFrame) }
      })
      return {
        savedUrl,
        numberOfClicks: result.length,
        statusCode: 200,
        message: 'Successfully found results'
      };
    } catch (error) {
      console.log(error)
      return {
        result: error,
        statusCode: 500,
        message: 'Internal Server Error'
      }
    }
  }

  findAll() {
    return this.urlModel.find();
  }
}
