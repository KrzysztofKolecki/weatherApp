import { IsNotEmpty, IsString } from 'class-validator';

export class GetWeatherDto {
    // Possible to add more validations here
  @IsNotEmpty()
  @IsString()
  city: string;
}