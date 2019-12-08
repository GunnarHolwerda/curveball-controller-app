import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurveballAccount } from '../models/curveball-account';

@Injectable({
  providedIn: 'root'
})
export class AccountStoreService {
  private _account$: BehaviorSubject<CurveballAccount | null> = new BehaviorSubject(null);

  constructor() {
    this.account = JSON.parse(sessionStorage.getItem('session'));
  }

  public get account$(): Observable<CurveballAccount> {
    return this._account$.asObservable();
  }

  public set account(value: CurveballAccount) {
    this._account$.next(value);
    sessionStorage.setItem('session', JSON.stringify(value));
  }

  public get account(): CurveballAccount {
    return this._account$.value;
  }
}
