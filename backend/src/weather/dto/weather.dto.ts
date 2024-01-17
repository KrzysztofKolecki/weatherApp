import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class WeatherDto {
  
  @IsNotEmpty()
  @IsNumber()
  temp: number;

  @IsNotEmpty()
  @IsNumber()
  humidity: number;

  @IsNotEmpty()
  @IsNumber()
  windSpeed: number;

  @IsNotEmpty()
  @IsString()
  conditions: string;

}