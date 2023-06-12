import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user';
import { LikeUserDto } from 'src/dtos/like-user.dto';
import { ObjectId, ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MatchService } from './match.service';

@UseGuards(JwtAuthGuard)
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Put('like/:likedUserId/:advertId')
  likeUser(
    @CurrentUser() currentUser,
    @Param('likedUserId', new ParseObjectIdPipe()) likedUserId: ObjectId,
    @Param('advertId', new ParseObjectIdPipe()) advertId: ObjectId,
  ) {
    return this.matchService.likeUser(currentUser._id, likedUserId, advertId);
  }
}
