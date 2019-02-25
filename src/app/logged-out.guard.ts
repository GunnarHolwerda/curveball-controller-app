import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AccountStoreService } from './stores/account-store.service';

@Injectable({
    providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate, CanActivateChild {
    constructor(private accountStore: AccountStoreService, private router: Router) { }

    async canActivateChild(): Promise<boolean> {
        return this.canActivate();
    }

    async canActivate(): Promise<boolean> {
        if (this.accountStore.account !== null) {
            await this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
