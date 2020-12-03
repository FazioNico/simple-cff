import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {first } from 'rxjs/operators';
import { TimetableService } from 'src/app/services/timetable/timetable.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  result: any = null;
  result$: Observable<any>;

  constructor(
    private _api:  TimetableService,
    private _router: Router
  ) { }

  async ngOnInit() {
    this.result$ = this._api.resultSearch;
    const result = await this._api.resultSearch.pipe(first()).toPromise()
    console.log(result);
    // if (!result) {
    //   this._router.navigate(['']);
    //   return;
    // }
    this.result = result;
  }

}
