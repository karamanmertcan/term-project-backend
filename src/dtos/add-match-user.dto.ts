import { IsString, IsNumber, IsUrl, IsArray } from 'class-validator';

export class AddMatchUserDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsNumber()
  age: number;

  @IsArray()
  photoURL: Array<string>;

  @IsString()
  petDescription: string;
}
