import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { TimetableService } from 'src/app/services/timetable/timetable.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private _api: TimetableService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      from: new FormControl('Genève'),
      to: new FormControl('Lausanne')
    });
  }

  async search() {
    if (!this.form.valid) return;
    console.log(this.form.value);
    await this._api.formTo(this.form.value);
    const result =  await this._api.resultSearch.pipe(first()).toPromise();
    console.log('result: ', result);
    if (!result?.connections) return;
    this._router.navigate(['result']);
  }
}
