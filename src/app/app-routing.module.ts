import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather.component';
import { CityComponent } from './components/city.component';

const ROUTES: Routes = [
  { path: 'weather/:id', component: WeatherComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)], //, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
