import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tsPageTitle = '';
  tsCompanyName = '';
  tsWelcomeMessage = '';
  tsMessageAboutApp = '';
  tsLogIn = '';
  tsMessageWebSite = '';
  tsMyProfilePage = '';
  tsMessageServerLocalCopy = '';
  tsMessageNoServerOnlyLocalCopy = '';
  tsMessageInvestorProfile = '';

  userLoading = false;
  toggleServerLive = false;
  togglemanualONLY = false;

  constructor(
    private ts: TranslateService,
    private ss: StorageService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    // At first time use, show intro page
    const introPreviouslyShown = await this.ss.get('introShown');
    if (!introPreviouslyShown) {
      this.ss.set('introShown', 'true');
      this.navCtrl.navigateForward('/intro');
    }

    // At first time use, set default settings
    const settingsFirst = await this.ss.get('SHOWCANCELED');
    if (!settingsFirst) {
      this.ss.set('SHOWCANCELED', 'FALSE');
      this.ss.set('MANUALONLY', 'FALSE');
      this.ss.set('SERVERLIVE', 'TRUE');
    } else {
      const manual = await this.ss.get('MANUALONLY');
      if (manual === 'TRUE') {
        this.togglemanualONLY = true;
        this.toggleServerLive = false;
      } else {
        this.togglemanualONLY = false;
        this.checkForLive();
      }
    }

    // asynchronous - gets translations then completes.
    this.ts
      .get([
        'HOME.PageTitle',
        'HOME.CompanyName',
        'HOME.WelcomeMessage',
        'HOME.MessageAboutApp',
        'HOME.LogIn',
        'HOME.MessageWebSite',
        'HOME.MyProfilePage',
        'HOME.MessageServerLocalCopy',
        'HOME.MessageNoServerOnlyLocalCopy',
        'HOME.MessageInvestorProfile',
      ])
      .subscribe((translations) => {
        this.tsPageTitle = translations['HOME.PageTitle'];
        this.tsCompanyName = translations['HOME.CompanyName'];
        this.tsWelcomeMessage = translations['HOME.WelcomeMessage'];
        this.tsMessageAboutApp = translations['HOME.MessageAboutApp'];
        this.tsLogIn = translations['HOME.LogIn'];
        this.tsMessageWebSite = translations['HOME.MessageWebSite'];
        this.tsMyProfilePage = translations['HOME.MyProfilePage'];
        this.tsMessageServerLocalCopy =
          translations['HOME.MessageServerLocalCopy'];
        this.tsMessageNoServerOnlyLocalCopy =
          translations['HOME.MessageNoServerOnlyLocalCopy'];
        this.tsMessageInvestorProfile =
          translations['HOME.MessageInvestorProfile'];
      });
  }

  async openWebSite() {
    const openCapacitorSite = async () => {
      await Browser.open({ url: 'https://rv.be/' });
    };
  }

  async checkForLive() {
    const cfl = await this.ss.get('SERVERLIVE');
    if (cfl === 'TRUE') {
      this.toggleServerLive = true;
    } else {
      /* this.ionicStorage.get('SERVERLIVE').then((vals) => {
      if (vals === 'TRUE') {
        this.toggleServerLive = true;
      } else {
        
      }
    }); */
    }
  }

  async openSettingsPopover(ev: any) {
    /* const popover = await this.popoverCtrl.create({
      component: SettingsPopoverPage,
      event: ev,
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    this.ionicStorage.get('MANUALONLY').then((val) => {
      if (val === 'TRUE') {
        this.togglemanualONLY = true;
        this.toggleServerLive = false;
      } else {
        this.togglemanualONLY = false;
        this.checkForLive();
      }
    }); */
  }
}
