import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateForumPostDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  content: string;

  @IsOptional()
  @IsString()
  image: string;
}
