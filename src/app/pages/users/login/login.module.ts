import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './login.page';

import { TranslateModule } from '@ngx-translate/core';
import { LoginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
