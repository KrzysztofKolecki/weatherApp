import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetWeatherDto } from './dto/get-weather.dto';
import { WeatherDto } from './dto/weather.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    @Get()
    @ApiOperation({ summary: 'Get weather data for a city' })
    @ApiResponse({ status: 200, description: 'Weather data retrieved successfully', type: GetWeatherDto})
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