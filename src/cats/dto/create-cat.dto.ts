import * as Joi from 'joi';
import { IsString, IsInt, Length, IsNumberString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @Length(3)
  name: string;

  @IsInt()
  age: number;
}

export const catsSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

export class FindOneParams {
  @IsNumberString()
  id: number;
}
