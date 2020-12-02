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
  itemsFrom: any [];
  itemsTo: any [];

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

  /**
   * Permet de générer une liste de suggestion 
   * pour l'input avec le control `from`
   * @param $event Event
   */
  async autoFrom($event) {
    console.log($event.target.value);
    const value = $event.target.value;
    // si la longueur du mot est plus petit ou égale à 2
    // je reset la liste de suggestion
    if (value.length <= 2) {
      this.itemsFrom = null;
      return;
    }
    // sinon je fais la requête à l'api 
    // avec la valeur saisie par l'utilisateur
    this.itemsFrom = await this._api.auto(value);
  }

  /**
   * Permet de selectionner la suggestion choisi par l'utilisateur 
   * lors du click sur un element de la liste de suggestion
   * @param item Element choisi par l'utilisateur
   */
  async selectFrom(item: any) {
    // mise à jour du formulaire reactif
    this.form.get('from').patchValue(item.label);
    // reset de la liste de suggestion 
    // pour faire disparaitre de l'affichage
    this.itemsFrom = null;
  }
}
