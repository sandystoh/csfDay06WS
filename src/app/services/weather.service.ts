import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherById(id: string): Promise<any> {
    console.log('Get Weather');
    const params = new HttpParams()
    .set('id', id)
    .set('appid', environment.api_key);

    return this.http.get(environment.api_url, {params}).toPromise();
  }

  getWeather(city: string): Promise<any> {
    const params = new HttpParams()
    .set('q', city)
    .set('appid', environment.api_key);

    return this.http.get(environment.api_url, {params}).toPromise();
  }
}
