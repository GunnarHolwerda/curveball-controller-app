import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Env } from './environment.service';
import { HttpMethod } from 'blocking-proxy/built/lib/webdriver_commands';

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
  basePath: string;

  constructor(private http: HttpClient, private env: Env) {
    this.basePath = this.env.quizEndpoint;
  }

  private get headers(): { [header: string]: string } {
    return {
      'Authorization': `Bearer ${this.env.internalToken}`
    };
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
