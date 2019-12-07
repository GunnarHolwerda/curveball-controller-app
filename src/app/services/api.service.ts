import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Env } from './environment.service';
import { AccountStoreService } from '../stores/account-store.service';

interface ApiRequestOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe?: 'body';
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected basePath: string;

  constructor(protected http: HttpClient, protected env: Env, protected accountStore: AccountStoreService) {
    this.basePath = this.env.quizEndpoint;
  }

  protected get headers(): { [header: string]: string } {
    if (!this.accountStore.account) {
      return {};
    }
    return { 'Authorization': `Bearer ${this.accountStore.account.token}` };
  }

  protected post<TResponse, TBody = any>(path: string, body?: TBody, options?: ApiRequestOptions): Promise<TResponse> {
    return this.request<TResponse, TBody>('POST', path, body, options);
  }

  protected get<TResponse>(path: string, options?: ApiRequestOptions): Promise<TResponse> {
    return this.request<TResponse, void>('GET', path, undefined, options);
  }

  protected put<TResponse, TBody = any>(path: string, body?: TBody, options?: ApiRequestOptions): Promise<TResponse> {
    return this.request<TResponse, TBody>('PUT', path, body, options);
  }

  protected delete<TResponse, TBody>(path: string, body?: TBody, options?: ApiRequestOptions): Promise<TResponse> {
    return this.request<TResponse, TBody>('DELETE', path, body, options);
  }

  private request<TResponse, TBody>(method: string, path: string, body?: TBody, options?: ApiRequestOptions): Promise<TResponse> {
    return this.http.request<TResponse>(method, this.basePath + path, {
      body,
      headers: this.headers,
      ...(options || {})
    }).toPromise();
  }
}
