import { Module } from '@nestjs/common';
import { AdvertService } from './advert.service';
import { AdvertController } from './advert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Advert, AdvertSchema } from 'src/schemas/advert.schema';
import { LocationService } from '../location/location.service';
import { LocationModule } from '../location/location.module';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Advert.name,
        schema: AdvertSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    LocationModule,
  ],
  providers: [AdvertService],
  controllers: [AdvertController],
  exports: [AdvertService],
})
export class AdvertModule {}
