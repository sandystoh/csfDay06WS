import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './components/weather.component';
import { WelcomeComponent } from './components/welcome.component';
import { CityComponent } from './components/city.component';

const ROUTES: Routes = [
  { path: 'weather/:id', component: WeatherComponent},
  { path: '', component: CityComponent },
  { path: 'city', component: CityComponent },
  { path: 'add', component: WelcomeComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'})], // , {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
