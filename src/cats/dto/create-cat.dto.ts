import * as Joi from 'joi';
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}

export const catsSchema = Joi.object({
  name: Joi.string().min(3).required(),
});
