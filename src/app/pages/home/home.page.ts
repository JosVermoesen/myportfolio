import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

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
  toggleServerLive = true;
  togglemanualONLY = false;

  constructor(
    private router: Router,
    private ts: TranslateService,
    private ss: StorageService,
    private navCtrl: NavController,
    public aService: AccountService
  ) {}

  async ngOnInit() {
    // At first time use, set default settings
    const settingsFirst = await this.ss.get('SHOWCANCELED');
    if (!settingsFirst) {
      this.ss.set('SHOWCANCELED', 'false');
      this.ss.set('MANUALONLY', 'false');
      this.ss.set('SERVERLIVE', 'true');
    } else {
      const manual = await this.ss.get('MANUALONLY');
      if (manual === 'true') {
        this.togglemanualONLY = true;
        this.toggleServerLive = false;
      } else {
        this.togglemanualONLY = false;
        this.checkForLive();
      }
    }

    // At first time use, show intro page
    const introPreviouslyShown = await this.ss.get('INTROSHOWN');
    if (!introPreviouslyShown) {
      this.ss.set('INTROSHOWN', 'true');
      this.navCtrl.navigateForward('/intro');
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
    await Browser.open({ url: 'https://rv.be/' });
    ;
  }

  async checkForLive() {
    const cfl = await this.ss.get('SERVERLIVE');
    if (cfl === 'true') {
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

  showMemberPage(){
    this.router.navigateByUrl('/user');
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
