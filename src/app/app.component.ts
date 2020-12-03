import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SimpleCFF';

  constructor(
    private _platform: Platform,
    private _toastCtrl: ToastController
    ) {
    this._platform.ready().then(platform => {
      this._displayToastInstall();
    });
  }


  private async _displayToastInstall(platform = null) {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = platform || window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test( userAgent );
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in (window as any).navigator) && ((window as any).navigator.standalone);
    // Checks if should display install popup notification:
    console.log(platform, isIos(), !isInStandaloneMode());
    if (isIos() && !isInStandaloneMode()) {
      const toast = await this._toastCtrl.create({
        header: 'Install PWA',
        message: 'la la, lala, lalalala',
        buttons: [
          {
            text: 'Ok',
            role: 'ok'
          }
        ]
      });
      await toast.present();
    }
  }
}
