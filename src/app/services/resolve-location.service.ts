import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';
import { Resolve } from '@angular/router';

@Injectable()
export class ResolveLocationService implements Resolve<any> {
  constructor(private weatherService: WeatherService) {}

  resolve() {
    return this.weatherService.localWeather();
  }
}
