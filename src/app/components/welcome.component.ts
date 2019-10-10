import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CityService } from '../services/city.service';
import { City } from '../models/city';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  cities: City[] = [];
  city: any = [{cityNum: 0, name: '', country: '', imageurl: ''}];

  constructor(private citySvc: CityService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.citySvc.getCityList()
    .then(result => {
      this.cities = result;
      this.cities.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }).catch((error) => {
      console.log(error);
    });
  }

  AddCity(f: NgForm) {
    const tempCity = this.cities.find(x => x.cityNum === f.value.cityNum);
    tempCity.imageurl = f.value.imageurl;

    this.citySvc.getCities()
    .then(result => {
      if ((result.find(x => x.cityNum === tempCity.cityNum)) == undefined) {
        this.citySvc.addCity(tempCity).then(() => {
          this.snackBar.open('New City ' + tempCity.name + ' Added!', 'OK', { duration: 2000});
          this.router.navigate(['/city']);
        });
        f.resetForm();
      } else {
        this.snackBar.open('Sorry! This city has already been added.', 'OK', { duration: 2000});
        f.resetForm();
      }
    }).catch((error) => {
      console.log(error);
    });

  }

  Cancel(f: NgForm) {
    f.resetForm();
    this.router.navigate(['/']);
  }
}
