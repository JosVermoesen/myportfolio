import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pageTitle = '';

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
}
