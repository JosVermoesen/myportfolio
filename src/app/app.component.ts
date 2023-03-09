import { LanguageService } from './services/language.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private ls: LanguageService) {
    this.ls.setInitialAppLanguage();
  }
}
