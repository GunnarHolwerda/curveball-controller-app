import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { IUser } from '../models/user';
import { Subject, BehaviorSubject } from '../../../node_modules/rxjs';
import { Env } from './environment.service';
import { ApiService } from './api.service';
import { AccountStoreService } from '../stores/account-store.service';
import { UserData } from '../types/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  constructor(http: HttpClient, env: Env, account: AccountStoreService) {
    super(http, env, account);
  }

  public async createUser(phone?: string, referralCode?: string): Promise<{ userId: string }> {
    return this.http.post<{ userId: string }>(`${this.basePath}/users`, { phone, referralCode }).toPromise();
  }

  public async verifyUser(userId: string, code: string): Promise<UserData> {
    return this.http.post<UserData>(`${this.basePath}/users/${userId}/verify`, { code }).toPromise();
  }
}
