import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private ss: StorageService, private navCtrl: NavController) {}

  async ngOnInit() {
    const introPreviouslyShown = await this.ss.get('introShown');
    if (!introPreviouslyShown) {
      this.ss.set('introShown', 'true');
      this.navCtrl.navigateForward('/intro');
    }
  }
}
