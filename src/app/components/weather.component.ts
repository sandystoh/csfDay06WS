import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CityService } from '../services/city.service';
import { Weather } from '../models/weather';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap } from '@angular/router';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  cityNum: string;
  city: any = [{cityNum: 0, name: '', country: '', imageurl: ''}];
  model = new Weather('', 0, 0, 0, 0, 0);

  constructor(private weatherSvc: WeatherService, private citySvc: CityService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => { this.cityNum = params.get('id');});
      this.cityNum = this.activatedRoute.snapshot.params.id;
      this.weatherSvc.getWeatherById(this.cityNum.toString())
      .then(result => {
        console.log(result);
        this.model = new Weather(result.name, result.main.temp, result.main.pressure,
          result.main.humidity, result.wind.speed, result.wind.deg);
      }).catch((error) => {
        console.log(error);
      });

      this.citySvc.getRecordByProperty('cityNum', this.cityNum)
      .then(result => {
        this.city = result;
      }).catch((error) => {
        console.log(error);
      });
  }

 }
