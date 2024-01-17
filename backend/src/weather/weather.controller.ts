import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherDto } from './dto/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query() query: GetWeatherDto): Promise<WeatherDto> {
    const { city } = query;
    try {
        const weatherData = await this.weatherService.getWeather(city);
        return weatherData;
    } catch (error) {
        throw new NotFoundException('City not found');
    }
  }
}