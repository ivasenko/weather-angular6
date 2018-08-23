import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { Weather } from '../../classes/weather';

@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  forecastForm: FormGroup;
  cityForecast: Weather[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe(({ params: { city } }: any) => {
      if (city) {
        this.weatherService
          .tenDayForecast(city)
          .subscribe((data: any) => (this.cityForecast = data));
      } else {
        this.weatherService
          .tenDayForecastForLocation()
          .then((data: any) => (this.cityForecast = data));
      }
    });

    this.forecastForm = new FormGroup({
      forecastCity: new FormControl(''),
    });
  }

  onSubmit() {
    this.cityForecast = [];
    this.weatherService
      .tenDayForecast(this.forecastForm.value.forecastCity)
      .subscribe((data: any) => {
        this.cityForecast = data;
      });
  }
}
