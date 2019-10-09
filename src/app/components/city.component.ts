import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models/city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities: City[] = [];

  constructor(private citySvc: CityService) { }

  ngOnInit() {
    this.citySvc.getCities()
    .then(result => {
      this.cities = result;
      this.cities.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
    }).catch((error) => {
      console.log(error);
    });
  }

}
