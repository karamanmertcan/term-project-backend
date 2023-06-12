import { IsString } from 'class-validator';

export class SetNotificationTokenDto {
  @IsString()
  notificationToken: string;
}
