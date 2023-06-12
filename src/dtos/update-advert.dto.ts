import { IsString, IsObject, IsArray, IsOptional } from 'class-validator';
export class UpdateAdvertDto {
  @IsOptional()
  @IsArray()
  photoURL: Array<string>;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsObject()
  location: object;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  age: string;

  @IsOptional()
  @IsString()
  breed: string;

  @IsOptional()
  @IsString()
  species: string;
}
