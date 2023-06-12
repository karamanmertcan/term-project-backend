/* eslint-disable @typescript-eslint/ban-types */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/decorators/current-user';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocationService } from './location.service';

@UseGuards(JwtAuthGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly geolocationService: LocationService) {}

  @Get('/geocoding/reverse')
  reverseGeocode(
    @CurrentUser() currentUser,
    @Query('lat') lat: string,
    @Query('lon') lon: string,
  ): Observable<{}> {
    return this.geolocationService.reverseGeocode(currentUser._id, lat, lon);
  }

  @Get('/geocoding/search')
  search(@Query('q') q: string): Observable<{}> {
    return this.geolocationService.search(q);
  }
}
