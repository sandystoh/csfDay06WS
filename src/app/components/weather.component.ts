import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../models/weather';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap } from '@angular/router';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  cityId: string;
  city = 'Singapore';
  model = new Weather(this.city, 0, 0, 0, 0, 0);

  constructor(private weatherSvc: WeatherService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.cityId = params.get('id');
      this.weatherSvc.getWeatherById(this.cityId.toString())
      .then(result => {
        console.log(result);
        this.model = new Weather(result.name, result.main.temp, result.main.pressure,
          result.main.humidity, result.wind.speed, result.wind.deg);
      }).catch((error) => {
        console.log(error);
      });
    });
  }

}
