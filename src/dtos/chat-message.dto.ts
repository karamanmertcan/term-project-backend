import { IsString, IsUrl } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  message: string;

  @IsUrl()
  avatar: string;
}
