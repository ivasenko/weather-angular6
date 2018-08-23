import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CurrentComponent } from '../components/current/current.component';
import { ForecastComponent } from '../components/forecast/forecast.component';
import { ResolveLocationService } from '../services/resolve-location.service';

const WEATHER_ROUTER: Routes = [
  {
    path: '',
    component: CurrentComponent,
    resolve: { hourCityForecast: ResolveLocationService },
  },
  { path: 'forecast', component: ForecastComponent },
  { path: 'forecast/:city', component: ForecastComponent },
];

export const WeatherRouting: ModuleWithProviders = RouterModule.forRoot(
  WEATHER_ROUTER
);
