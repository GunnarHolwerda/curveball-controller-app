import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Env } from '../services/environment.service';

@Component({
  selector: 'cb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  phoneSubmitted = false;
  userId: string;

  constructor(
    private userService: UserService,
    private env: Env,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.userService.activeUser) {
      this.router.navigate(['/app']);
    }
    this.loginForm = new FormGroup({
      phone: new FormControl('', [Validators.required]),
      verifyCode: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required])
    });
  }

  async submitPhone(): Promise<void> {
    const { phone } = this.loginForm.value;
    const result = await this.userService.createUser(phone);
    this.userId = result.userId;
    this.phoneSubmitted = true;
  }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }
    const { verifyCode, token } = this.loginForm.value;
    try {
      const result = await this.userService.verifyUser(this.userId, verifyCode);
      this.userService.setActiveUser(result.user, result.token);
      this.env.internalToken = token;
      sessionStorage.setItem('quizJwt', result.token);
      sessionStorage.setItem('internalToken', token);
      sessionStorage.setItem('user', JSON.stringify(result.user));
      this.router.navigate(['/app']);
    } catch (e) {
      console.error(e);
      // Show login error
      // clear form
    }
  }
}
