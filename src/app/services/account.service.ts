import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  decodedToken: any;
  currentUser!: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(
    private ss: StorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    this.ss.set('TOKEN', user.token);
    this.ss.set('USER', JSON.stringify(user));
    // localStorage.setItem('TOKEN', user.token);
    // localStorage.setItem('USER', JSON.stringify(user));
    // console.log(user.roles);
    this.currentUserSource.next(user);
  }

  login(values: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', values).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          // this.presence.createHubConnection(user);
        }
      })
    );
  }

  register(values: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', values).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
          // this.presence.createHubConnection(user);
        }
      })
    );
  }

  logout() {
    this.ss.remove('TOKEN');
    this.ss.remove('USER');
    // localStorage.removeItem('TOKEN');
    // localStorage.removeItem('USER');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
