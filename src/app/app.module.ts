import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/**
 * Routing
 */
import { WeatherRouting } from './routing/weather.routing';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrentComponent } from './components/current/current.component';
import { ForecastComponent } from './components/forecast/forecast.component';

/**
 * Services
 */
import { WeatherService } from './services/weather.service';
import { ResolveLocationService } from './services/resolve-location.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrentComponent,
    ForecastComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    WeatherRouting,
    ReactiveFormsModule,
  ],
  providers: [WeatherService, ResolveLocationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
