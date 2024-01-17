import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

jest.mock('./weather.service');

describe('WeatherController', () => {
  let controller: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  describe('getWeather', () => {
    it('should return weather data', async () => {
      const city = 'London';
      const weatherData = {
        temp: 25,
        humidity: 50,
        windSpeed: 10,
        conditions: 'Clear sky',
      };

      jest.spyOn(weatherService, 'getWeather').mockResolvedValue(weatherData);

      const result = await controller.getWeather({ city });

      expect(result).toEqual(weatherData);
    });

    it('should handle city not found', async () => {
      const city = 'NonExistentCity';

      jest.spyOn(weatherService, 'getWeather').mockRejectedValue(new Error('City not found'));

      try {
        await controller.getWeather({ city });
      } catch (error) {
        expect(error.message).toBe('City not found');
      }
    });
  });
});