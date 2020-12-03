import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimetableService } from 'src/app/services/timetable/timetable.service';

@Injectable({
  providedIn: 'root'
})
export class ResultGuard implements CanActivate {

  constructor(
    private _timetableService: TimetableService,
    private _router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return  this._timetableService.resultSearch.pipe(
      map(result => {
        if (!result) {
          this._router.navigate(['']);
          return false;
        } else {
          return true;
        }
      })
    );
    // return true;
  }
}
