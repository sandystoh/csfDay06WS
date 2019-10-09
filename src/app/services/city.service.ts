import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, flatMap, toArray } from 'rxjs/operators';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCities(): Promise<any> {
    // return this.http.get('./assets/data/citylist.json').toPromise();
    return(
      this.http.get<City[]>('./assets/data/citylist.json')
    .pipe(
        map(v => v['cities']),
        flatMap(v => v),
        map((v: any) => {
            return (<City>{ id: v.id, name: v.name, country: v.country });
        }),
        toArray()
    )
    .toPromise()
    );
  }
}
