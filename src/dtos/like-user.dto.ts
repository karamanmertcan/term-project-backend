import { IsString } from 'class-validator';

export class LikeUserDto {
  @IsString()
  userId: string;

  @IsString()
  likedUser: string;

  @IsString()
  advertId: string;
}
