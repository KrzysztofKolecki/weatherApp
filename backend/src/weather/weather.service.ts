import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { WeatherDto } from './dto/weather.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class WeatherService {

    constructor(@Inject(CACHE_MANAGER) private cache: Cache) { }

    async getWeather(city: string): Promise<WeatherDto> {
        const apiKey = process.env.API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

        try {
            const cachedWeatherData: WeatherDto = await this.cache.get(city);
            if (cachedWeatherData) {
                return cachedWeatherData;
            }
            const response = await axios.get(url);
            const { main, wind, weather } = response.data;
            const weatherData: WeatherDto = {
                temp: main.temp,
                humidity: main.humidity,
                windSpeed: wind.speed,
                conditions: weather[0].description,
            };

            // store weatherData in cache for a minute
            await this.cache.set(city, weatherData, 6000);

            return weatherData;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

}