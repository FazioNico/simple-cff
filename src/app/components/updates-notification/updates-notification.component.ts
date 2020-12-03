import { Component, OnInit } from '@angular/core';
import { Observable, Subject, merge, of } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ToastOptions } from '@ionic/core';

@Component({
  selector: 'app-updates-notification',
  template: `
    <div *ngIf="updateAvailable$|async"> </div>
  `,
  styles: [``]
})
export class UpdatesNotificationComponent  {

  updateAvailable$: Observable<boolean | {}>;
  closed$ = new Subject<void>();

  constructor(
      private updates: SwUpdate,
      private _toast: ToastController
  ) {
      console.log('Application updater install: ', environment.production);
      this.updateAvailable$ = merge(
          of(false),
          this.updates.available.pipe(
              map(async _ => await this._displayNotif()),
              map(() => true)
          ),
          this.closed$.pipe(map(() => false)),
      );
  }

  activateUpdate() {
      if (environment.production) {
          this.updates.activateUpdate().then(() => {
              location.reload();
          });
      }
  }
  private async _displayNotif() {
    console.log('display notification...');
    const data: ToastOptions = {
      message: 'Nouvelle mise à jours!',
      position: 'bottom',
      buttons: [
        {
          text: 'Update',
          role: 'ok'
        }
      ]
    };
    const toast = await this._toast.create(data);
    await toast.present();
    toast.onDidDismiss()
         .then(_ => this.activateUpdate());
  }
}