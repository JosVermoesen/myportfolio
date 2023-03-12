import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { SlidesPageRoutingModule } from './slides-routing.module';
import { SlidesPage } from './slides.page';
import { SwiperModule } from 'swiper/angular';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    IonicModule,
    SlidesPageRoutingModule,
    SwiperModule,
  ],
  declarations: [SlidesPage],
})
export class SlidesPageModule {}
