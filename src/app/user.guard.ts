import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { Env } from './services/environment.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private env: Env, private router: Router) { }

  async canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }

  async canActivate(): Promise<boolean> {
    const token = this.env.internalToken;
    if (token !== undefined) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
