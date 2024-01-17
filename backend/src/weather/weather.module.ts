import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [WeatherController],
  imports: [CacheModule.register()],
  providers: [WeatherService],
})
export class WeatherModule {}
