import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../services/storage.service';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  selected = '';

  constructor(private ts: TranslateService, private ss: StorageService) {}

  async setInitialAppLanguage() {
    const language = this.ts.getBrowserLang() || 'en';
    this.ts.setDefaultLang(language);

    const chosenLanguage = await this.ss.get(LNG_KEY);
    if (!chosenLanguage) {
      this.ss.set(LNG_KEY, language);
      this.setLanguage(language);
      this.selected = language;
    } else {
      this.setLanguage(chosenLanguage);
      this.selected = chosenLanguage;
    }
  }

  getLanguages() {
    return [
      {
        text: 'Nederlands',
        value: 'nl',
        img: 'assets/images/flags/nl_small.png',
      },
      {
        text: 'English',
        value: 'en',
        img: 'assets/images/flags/en_small.png',
      },
      {
        text: 'Français',
        value: 'fr',
        img: 'assets/images/flags/fr_small.png',
      },
      {
        text: 'Deutsch',
        value: 'de',
        img: 'assets/images/flags/de_small.png',
      },
    ];
  }

  setLanguage(lng: string) {
    this.ts.use(lng);
    this.selected = lng;
    this.ss.set(LNG_KEY, lng);
  }
}
