import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';
import { City } from '../models/city';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  cities: City[] = [];

  constructor(private citySvc: CityService, private router: Router) { }

  ngOnInit() {
    this.getCities();
  }

  getCities() {
   this.citySvc.getCities()
    .then(result => {
      this.cities = result;
      this.cities.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteCity(event, id) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.citySvc.deleteCity(id).then(result => {
      this.getCities();
    }).catch((error) => {
      console.log(error);
    });
  }

}
