import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Env } from './environment.service';
import { HttpClient } from '@angular/common/http';

interface AccountLoginResult {
  accountId: string;
  networkName: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ApiService {

  constructor(http: HttpClient, env: Env) {
    super(http, env);
    const internalToken = sessionStorage.getItem('internalToken');
    if (internalToken) {
      this.env.internalToken = internalToken;
    }
  }

  public createAccount(email: string, password: string, networkName: string): Promise<void> {
    return this.post(`/accounts`, { email, password, networkName });
  }

  public async loginToAccount(email: string, password: string): Promise<AccountLoginResult> {
    const loginResult = await this.post<AccountLoginResult>(`/accounts:login`, { email, password });
    this.env.internalToken = loginResult.token;
    return loginResult;
  }
}
