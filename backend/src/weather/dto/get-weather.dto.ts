import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetWeatherDto {
  // Possible to add more validations here
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'City name',
    example: 'London'
  })
  city: string;
  }