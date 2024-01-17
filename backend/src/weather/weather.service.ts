import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WeatherDto } from './dto/weather.dto';

@Injectable()
export class WeatherService {

  getWeather(city: string): Promise<WeatherDto> {
    const apiKey = process.env.API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    return axios.get(url).then((response) => {
        const { main, wind, weather } = response.data;
        return {
          temp: main.temp,
          humidity: main.humidity,
          windSpeed: wind.speed,
          conditions: weather[0].description,
        };
      }, (error) => {
        console.error('Error fetching weather data:', error);
        throw error;
      });
    
  }
}