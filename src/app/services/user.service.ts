import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { IUser } from '../models/user';
import { Subject } from '../../../node_modules/rxjs';
import { Env } from './environment.service';

const AdminPhoneNum = '000-000-0000';
const DefaultVerifyCode = '0000000';

interface UserData {
  user: IUser;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private path: string;
  private _user: Subject<IUser> = new Subject();
  private _activeUser: IUser;
  private _activeToken: string;

  constructor(private http: HttpClient, private env: Env) {
    this.path = this.env.quizEndpoint;
    this.loadNewActiveUser(AdminPhoneNum, DefaultVerifyCode);
  }

  public async loadNewActiveUser(phone: string, code: string): Promise<void> {
    const { userId } = await this.createUser(phone);
    const { user, token } = await this.verifyUser(userId, code);
    this._activeUser = user;
    this._activeToken = token;
    this._user.next(this._activeUser);
  }

  public async createUser(phone?: string, referralCode?: string): Promise<{ userId: string }> {
    return this.http.post<{ userId: string }>(`${this.path}/users`, { phone, referralCode }).toPromise();
  }

  public async verifyUser(userId: string, code: string): Promise<UserData> {
    return this.http.post<UserData>(`${this.path}/users/${userId}/verify`, { code }).toPromise();
  }

  public get user(): Subject<IUser> {
    return this._user;
  }

  public get activeUser(): IUser {
    return this._activeUser;
  }

  public get activeJwt(): string {
    return this._activeToken;
  }
}
