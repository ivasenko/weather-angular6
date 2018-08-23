import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../classes/weather';
import 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'wa-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentComponent implements OnInit {
  hourForecastForm: FormGroup;
  hourCityForecast: Weather[] = [];

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { hourCityForecast: Weather[] }) => {
      this.hourCityForecast = data.hourCityForecast;
    });

    this.hourForecastForm = new FormGroup({
      cityHour: new FormControl(''),
    });
  }

  onSubmit() {
    this.hourCityForecast = [];
    this.weatherService
      .getWeatherByCity(this.hourForecastForm.value.cityHour)
      .subscribe((data: any) => {
        this.hourCityForecast = data;
      });
  }

  public goToCurrentlocation() {
    this.route.data.subscribe((data: { hourCityForecast: Weather[] }) => {
      this.hourCityForecast = data.hourCityForecast;
    });
  }
  public goToTenDaysWeather() {
    this.router.navigate(['forecast', this.hourForecastForm.value.cityHour]);
  }
}
