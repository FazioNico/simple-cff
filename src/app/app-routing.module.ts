import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultPageComponent } from './containers/result-page/result-page.component';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { ResultGuard } from './guards/result/result.guard';


const routes: Routes = [
  {
    path: '',
    component: SearchPageComponent
  },
  {
    path: 'result',
    component: ResultPageComponent,
    canActivate: [
      ResultGuard
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
