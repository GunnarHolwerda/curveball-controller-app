import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AccountStoreService } from './stores/account-store.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private accountStore: AccountStoreService) { }

  async canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }

  async canActivate(): Promise<boolean> {
    if (this.accountStore.account) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
