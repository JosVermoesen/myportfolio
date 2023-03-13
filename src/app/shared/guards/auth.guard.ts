import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private aService: AccountService) {}

  canActivate(): Observable<boolean> {
    return this.aService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        else {
          const showFailed = async () => {
            await Toast.show({
              text: 'You shall not pass!',
            });
          };
          showFailed();
          return false;
        }
      })
    );
  }
}
