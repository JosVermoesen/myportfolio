import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { Toast } from '@capacitor/toast';

/* function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
} */

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  // public photos: StoragePhoto[] = [];

  editForm!: FormGroup;
  // @ViewChild('editForm')
  activeUser!: User;
  public user: User | undefined;
  // imgData: any;

  searchClient!: string;
  hasClientNumber!: boolean;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private aService: AccountService,
    private userService: UserService,
    private router: Router,
    private translate: TranslateService,
    private alertCtrl: AlertController
  ) {
    this.aService.currentUser$.pipe(take(1)).subscribe({
      next: (result) => {
        this.activeUser = result as User;
        console.log(this.activeUser);
        if (this.activeUser.clientNumber === null) {
          // this.userParams = new UserParams(user);
          this.hasClientNumber = false;
        } else {
          this.hasClientNumber = true;
        }
      },
    });
  }

  ionViewWillEnter() {
    // this.isLoading = false;
  }

  ionViewDidEnter() {
    if (!this.hasClientNumber) {
      // clientNumberWarning
      const msg =
        'Contracten via ons kantoor zijn spoedig raadpleegbaar. U kan deze melding uitschakelen indien U enkel met eigen inbreng wenst te werken';
      const showWarning = async () => {
        await Toast.show({
          text: msg,
          duration: 'long',
        });
      };
      showWarning();
    }
  }

  ngOnInit() {
    // this.loadSavedPhotos();
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUser(this.activeUser.userName).subscribe((result) => {
      this.user = result;
      this.isLoading = false;
    });
  }

  onImagePicked(imageData: string | File) {
    /* let imageFile: any;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.imgData = imageFile;
    this.photos.unshift({
      data: imageData,
    });

    // Save all photos for later viewing
    this.ionicStorage.set('photos', this.photos);
    // console.log(this.imgData); */
  }

  loadClientData() {
    console.log(this.activeUser.clientNumber);

    /* this.isLoading = true;
    this.router.navigate(['/customers', this.activeUser.clientNumber]);
    this.isLoading = false; */
  }

  fakeClientNumber(clientId: string) {
    console.log(this.searchClient);
    /* if (this.searchClient.length == 6) {
      this.isLoading = true;
      this.router.navigate(['/customers', this.searchClient]);
    } */
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('ALERT.titlePageRefresh'),
      message:
        this.translate.instant('ALERT.msgPartOne') +
        ' <strong>' +
        this.translate.instant('ALERT.msgPartTwo') +
        '</strong>',
      buttons: [
        {
          text: this.translate.instant('ALERT.btnCancelText'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: this.translate.instant('ALERT.btnOkText'),
          handler: () => {
            window.location.reload();
          },
        },
      ],
    });

    await alert.present();
  }

  loadSavedPhotos() {
    /* this.ionicStorage.get('photos').then((photos) => {
      this.photos = photos || [];
    }); */
  }
}
