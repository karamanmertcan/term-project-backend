import {
  IsString,
  IsObject,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
export class CreateAdvertDto {
  @IsArray()
  photoURL: Array<string>;

  @IsString()
  title: string;

  @IsObject()
  location: {
    lat: string;
    lon: string;
  };

  @IsString()
  description: string;

  @IsString()
  age: string;

  @IsString()
  @IsOptional()
  breed: string;

  @IsString()
  species: string;
}
