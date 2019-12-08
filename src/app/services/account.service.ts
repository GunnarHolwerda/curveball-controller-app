import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Env } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { AccountStoreService } from '../stores/account-store.service';
import { CurveballAccount } from '../models/curveball-account';
import { IUser } from '../models/user';

interface CreateAccountOptions {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  network: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ApiService {

  constructor(http: HttpClient, env: Env, accountStore: AccountStoreService) {
    super(http, env, accountStore);
  }

  public createAccount(options: CreateAccountOptions): Promise<void> {
    return this.post(`/accounts`, { ...options });
  }

  public async loginToAccount(email: string, password: string): Promise<CurveballAccount> {
    const loginResult = await this.post<CurveballAccount>(`/accounts:login`, { email, password });
    this.accountStore.account = loginResult;
    return loginResult;
  }

  public async linkAccount(accountToken: string, userToken: string): Promise<void> {
    const { user } = await this.post<{ user: IUser }>(`/accounts:link`, { accountToken, userToken });
    this.accountStore.account = { ...this.accountStore.account, linkedUser: { user, token: userToken } };
  }
}
