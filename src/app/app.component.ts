import { LanguageService } from './services/language.service';
import { Component } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/user';
import { StorageService } from './services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  expire!: number;
  aUser: User | undefined;

  user!: User;
  memberLoading = false;

  constructor(
    private ss: StorageService,
    private ls: LanguageService,
    private ts: TranslateService,
    private alertCtrl: AlertController,
    public aService: AccountService
  ) {
    this.ls.setInitialAppLanguage();
    this.setCurrentUser();
  }

  async setCurrentUser() {
    const userString = await this.ss.get('USER');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.aService.setCurrentUser(user);
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: this.ts.instant('ALERT.titleLogout'),
      message:
        this.ts.instant('ALERT.msgLogout') +
        ' <strong>' +
        this.ts.instant('ALERT.msgAreYouSure') +
        '</strong>',
      buttons: [
        {
          text: this.ts.instant('ALERT.btnCancelText'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (doNothing) => {},
        },
        {
          text: this.ts.instant('ALERT.btnOkText'),
          handler: () => {
            this.aService.logout();
          },
        },
      ],
    });
    await alert.present();
  }
}
