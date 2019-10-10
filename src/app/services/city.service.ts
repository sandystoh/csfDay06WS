import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, flatMap, toArray } from 'rxjs/operators';
import { City } from '../models/city';

export const DBHOST = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  

  constructor(private http: HttpClient) { }

  getCities(): Promise<any> {
    // return this.http.get('./assets/data/citylist.json').toPromise();
    return(
      this.http.get<City[]>(DBHOST + 'cities').toPromise()
    );
  }

  getRecordByProperty(property: string, cityNum: string) : Promise<City> {
    return(
      this.http.get<City>(DBHOST + 'cities?' + property + '=' + cityNum).toPromise()
    );
  }

  addCity(city: City) {
    return (this.http.post(DBHOST +'cities', city).toPromise());
  }

  deleteCity(id) {
    console.log(id);
    return (this.http.delete(DBHOST +'cities/'+ id).toPromise());
  }

  getCityList(): Promise<any> {
    // return this.http.get('./assets/data/citylist.json').toPromise();
    return(
      this.http.get<City[]>('./assets/data/citylist.json')
    .pipe(
        map(v => v['cities']),
        flatMap(v => v),
        map((v: any) => {
            return (<City>{ cityNum: v.id, name: v.name, country: v.country });
        }),
        toArray()
    )
    .toPromise()
    );
  }
}
