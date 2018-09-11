import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router) { }

  async canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }

  async canActivate(): Promise<boolean> {
    const user = this.userService.activeUser;
    if (user !== undefined) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
