/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'src/pipes/parse-object-id.pipe';

@Injectable()
export class LocationService {
  private LOCATIONIQ_API_KEY: string;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    this.LOCATIONIQ_API_KEY = this.configService.get('LOCATIONIQ_API_KEY');
  }

  reverseGeocode(userId: ObjectId, lat: string, lon: string): any {
    return this.httpService
      .get(
        `https://eu1.locationiq.com/v1/reverse?key=${this.LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&zoom=[10-18]&format=json`,
      )
      .pipe(
        map(async (response) => {
          console.log(response.data);
          await this.userModel.findByIdAndUpdate(userId, {
            $set: {
              userFullAdress : response.data.display_name,
              location: {
                lat: response.data.lat,
                lon: response.data.lon,
              },
            },
          });
        }),
      );
  }

  findAdvertLocation(lat: string, lon: string): Observable<{}> {
    return this.httpService
      .get(
        `https://eu1.locationiq.com/v1/reverse?key=${this.LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&zoom=[10-18]&format=json`,
      )
      .pipe(map((response) => response.data));
  }

  search(q: string): Observable<{}> {
    return this.httpService
      .get(
        `https://api.locationiq.com/v1/search?key=${this.LOCATIONIQ_API_KEY}&q=${q}&format=json`,
      )
      .pipe(map((response) => response.data));
  }
}
