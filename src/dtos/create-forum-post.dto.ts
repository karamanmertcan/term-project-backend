import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Categories } from 'src/schemas/forum.schema';

export class CreateForumPostDto {
  @IsString()
  @MaxLength(280)
  @MinLength(1)
  content: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsEnum(Categories)
  categorie: Categories;
}

// enum Categories {
//   Cat = 'Cat', //or User = "user",
//   Dog = 'Dog',
//   Birds = 'Birds',
//   Rabbits = 'Rabbits',
//   Fish = 'Fish',
//   Parrots = 'Parrots',
//   Hamsters = 'Hamsters',
//   Others = 'Others',
//   // or Admin = "admin",
// }
