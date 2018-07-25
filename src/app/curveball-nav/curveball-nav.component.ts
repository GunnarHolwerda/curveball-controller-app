import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user';

@Component({
  selector: 'cb-curveball-nav',
  templateUrl: './curveball-nav.component.html',
  styleUrls: ['./curveball-nav.component.css']
})
export class CurveballNavComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  get user(): IUser {
    return this.userService.activeUser;
  }

}
