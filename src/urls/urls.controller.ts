import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { isUri } from 'valid-url';
import { Response } from 'express';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) { }

  @Post('shortening')
  async shortening(
    @Body('url') originalUrl: string,
    @Res() res: Response
  ) {

    if (!isUri(originalUrl)) {
      return {
        message: "Invalid url"
      }
    }

    const { result, statusCode, message } = await this.urlsService.shortening(originalUrl);
    return res.status(statusCode).json({ result, message });
  }


  @Get('redirection')
  async redirection(
    @Body('url') shortUrl: string,
    @Res() res: Response
  ) {

    if (!isUri(shortUrl)) {
      return {
        message: "Invalid url"
      }
    }

    const { result, statusCode, message } = await this.urlsService.redirection(shortUrl);

    return res.status(statusCode).json({ result, message });
  }

  @Get('report')
  async report(
    @Body('timeFrame') timeFrame: string,
    @Body('url') url: string,
    @Res() res: Response
  ) {
    const { savedUrl, numberOfClicks, statusCode, message } = await this.urlsService.report(timeFrame, url);

    return res.status(statusCode).json({ url: savedUrl, count: numberOfClicks, message });
  }

  @Get()
  findAll() {
    return this.urlsService.findAll();
  }

}
