import { Injectable } from '@angular/core';
import { Weather } from '../classes/weather';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
  url = 'http://api.openweathermap.org/data/2.5';
  appid = 'a0bde15c95815c2f86dc8b338224ce5f';

  constructor(private http: HttpClient) {}

  localWeather() {
    return new Promise(res => {
      navigator.geolocation.getCurrentPosition(pos => {
        const location = pos.coords;
        const lat = location.latitude;
        const lon = location.longitude;

        return this.http
          .get(
            `${this.url}/forecast?lat=${lat}&lon=${lon}&appid=${
              this.appid
            }&units=metric`
          )
          .pipe(map((response: any) => this.mapHourlyWeatherData(response)))
          .toPromise()
          .then((data: any) => res(data));
      });
    });
  }

  getWeatherByCity(city: string) {
    return this.http
      .get(`${this.url}/forecast?q=${city}&appid=${this.appid}&units=metric`)
      .pipe(map((response: any) => this.mapHourlyWeatherData(response)));
  }

  tenDayForecast(city: string) {
    return this.http
      .get(
        `${this.url}/forecast/daily?q=${city}&appid=${
          this.appid
        }&units=metric&cnt=10`
      )
      .pipe(map((response: any) => this.mapDailyWeatherData(response)));
  }

  tenDayForecastForLocation() {
    return new Promise(res => {
      navigator.geolocation.getCurrentPosition(pos => {
        const location = pos.coords;
        const lat = location.latitude;
        const lon = location.longitude;

        return this.http
          .get(
            `${this.url}/forecast/daily?lat=${lat}&lon=${lon}&appid=${
              this.appid
            }&units=metric&cnt=10`
          )
          .pipe(map((response: any) => this.mapDailyWeatherData(response)))
          .toPromise()
          .then((data: any) => res(data));
      });
    });
  }

  mapHourlyWeatherData(response) {
    return response.list.map(
      item =>
        new Weather(
          response.city.name,
          item.main.temp,
          item.weather[0].icon,
          item.weather[0].description,
          item.main.temp_max,
          item.main.temp_min,
          item.sys.sunrise,
          item.dt_txt
        )
    );
  }

  mapDailyWeatherData(response) {
    return response.list.map(
      item =>
        new Weather(
          response.city.name,
          item.temp.day,
          item.weather[0].icon,
          item.weather[0].description,
          item.temp.max,
          item.temp.min,
          null,
          item.dt
        )
    );
  }
}
