import { IsString, IsEmail, IsOptional } from 'class-validator';

export class ChangeUserInformationDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  photoURL: string;
}
