import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Env } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { AccountStoreService } from '../stores/account-store.service';
import { CurveballAccount } from '../models/curveball-account';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ApiService {

  constructor(http: HttpClient, env: Env, private accountStore: AccountStoreService) {
    super(http, env);
    const internalToken = sessionStorage.getItem('internalToken');
    if (internalToken) {
      this.env.internalToken = internalToken;
    }
  }

  public createAccount(email: string, password: string, networkName: string): Promise<void> {
    return this.post(`/accounts`, { email, password, networkName });
  }

  public async loginToAccount(email: string, password: string): Promise<CurveballAccount> {
    const loginResult = await this.post<CurveballAccount>(`/accounts:login`, { email, password });
    sessionStorage.setItem('internalToken', loginResult.token);
    this.env.internalToken = loginResult.token;
    this.accountStore.account = loginResult;
    return loginResult;
  }
}
