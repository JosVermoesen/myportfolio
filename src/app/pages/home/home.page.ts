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
  pageTitle = '';

  userLoading = false;
  toggleServerLive = false;
  togglemanualONLY = false;

  constructor(
    private ts: TranslateService,
    private ss: StorageService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    const introPreviouslyShown = await this.ss.get('introShown');
    if (!introPreviouslyShown) {
      this.ss.set('introShown', 'true');
      this.navCtrl.navigateForward('/intro');
    }

    // asynchronous - gets translations then completes.
    this.ts.get(['HOME.PageTitle']).subscribe((translations) => {
      this.pageTitle = translations['HOME.PageTitle'];
    });
  }

  async openWebSite() {
    const openCapacitorSite = async () => {
      await Browser.open({ url: 'https://rv.be/' });
    };
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
