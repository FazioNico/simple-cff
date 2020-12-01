import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultPageComponent } from './containers/result-page/result-page.component';
import { SearchPageComponent } from './containers/search-page/search-page.component';


const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent
  },
  {
    path: 'result',
    component: ResultPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
