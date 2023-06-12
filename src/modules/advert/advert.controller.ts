import { Body, Controller, Delete, Post, UseGuards, Get } from '@nestjs/common';
import { Param, Put } from '@nestjs/common/decorators';
import { CurrentUser } from 'src/decorators/current-user';
import { CreateAdvertDto } from 'src/dtos/create-advert.dto';
import { UpdateAdvertDto } from 'src/dtos/update-advert.dto';
import { ObjectId, ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdvertService } from './advert.service';

@UseGuards(JwtAuthGuard)
@Controller('advert')
export class AdvertController {
  constructor(private readonly advertService: AdvertService) {}

  @Post('create')
  createAdvert(
    @CurrentUser() currentUser,
    @Body() createAdvertDto: CreateAdvertDto,
  ) {
    return this.advertService.createAdvert(currentUser._id, createAdvertDto);
  }

  @Delete('delete/:advertId')
  deleteAdvert(
    @Param('advertId', new ParseObjectIdPipe()) advertId: ObjectId,
    @CurrentUser() currentUser,
  ) {
    return this.advertService.deleteAdvert(currentUser._id, advertId);
  }

  @Put('update/:advertId')
  updateAdvert(
    @Param('advertId', new ParseObjectIdPipe()) advertId: ObjectId,
    @CurrentUser() currentUser,
    @Body() updateAdvertDto: UpdateAdvertDto,
  ) {
    return this.advertService.updateAdvert(
      currentUser._id,
      advertId,
      updateAdvertDto,
    );
  }

  @Get('all-adverts')
  getAllAdverts() {
    return this.advertService.getAllAdverts();
  }

  @Get('get-users-all-adverts')
  getUsersAllPosts(@CurrentUser() currentUser) {
    return this.advertService.getUsersAllAdverts(currentUser._id);
  }

  @Get('single-advert/:advertId')
  getSingleAdvert(
    @Param('advertId', new ParseObjectIdPipe()) advertId: ObjectId,
  ) {
    return this.advertService.getSingleAdvert(advertId);
  }
}
