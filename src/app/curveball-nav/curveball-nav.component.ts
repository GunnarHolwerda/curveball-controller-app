import { Component, OnInit } from '@angular/core';
import { AccountStoreService } from '../stores/account-store.service';
import { CurveballAccount } from '../models/curveball-account';

@Component({
  selector: 'cb-curveball-nav',
  templateUrl: './curveball-nav.component.html',
  styleUrls: ['./curveball-nav.component.css']
})
export class CurveballNavComponent implements OnInit {
  account: CurveballAccount;

  constructor(private accountStore: AccountStoreService) { }

  ngOnInit() {
    this.accountStore.account$.subscribe(account => this.account = account);
  }
}
