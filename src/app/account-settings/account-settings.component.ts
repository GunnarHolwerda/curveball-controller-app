import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AccountService } from '../services/account.service';
import { AccountStoreService } from '../stores/account-store.service';
import { IUser } from '../models/user';

@Component({
  selector: 'cb-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  private userId: string;
  userAccount: IUser;
  phoneNumber: string;
  code: string;

  constructor(private userService: UserService, private accountService: AccountService, private accountStore: AccountStoreService) { }

  ngOnInit() {
    this.accountStore.account$.subscribe(u => {
      this.userAccount = u.linkedUser ? u.linkedUser.user : null;
    });
  }

  public async getCode(): Promise<void> {
    const { userId } = await this.userService.createUser(this.phoneNumber);
    this.userId = userId;
  }

  public async linkAccount(): Promise<void> {
    const result = await this.userService.verifyUser(this.userId, this.code);
    await this.accountService.linkAccount(this.accountStore.account.token, result.token);
  }

}
