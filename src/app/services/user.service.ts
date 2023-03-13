import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs';

import { User } from '../models/user';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;
  users: User[] = [];
  userCache = new Map();
  user: User | undefined;

  constructor(private http: HttpClient, private aService: AccountService) {
    this.aService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          // this.userParams = new UserParams(user);
          this.user = user;
        }
      },
    });
  }

  getUser(userName: string) {
    return this.http.get<User>(this.baseUrl + 'users/' + userName);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + 'users', user).pipe(
      map(() => {
        const index = this.users.indexOf(user);
        this.users[index] = user;
      })
    );
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(
      this.baseUrl + 'users/' + id + '/like/' + recipientId,
      {}
    );
  }
}
