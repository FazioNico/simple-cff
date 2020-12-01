import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {first } from 'rxjs/operators';
import { TimetableService } from 'src/app/services/timetable/timetable.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  result = null;
  constructor(
    private _api:  TimetableService
  ) { }

  async ngOnInit() {
    const result = await this._api.resultSearch.pipe(first()).toPromise()
    console.log(result);
    this.result = result;
  }

}
