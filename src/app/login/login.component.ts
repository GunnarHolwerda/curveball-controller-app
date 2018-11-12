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
  tokenSubmitted = false;
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
      token: new FormControl('', [Validators.required])
    });
  }

  async submitToken(): Promise<void> {
    this.env.internalToken = this.loginForm.value.token;
    this.tokenSubmitted = true;
  }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }
    const { phone, token } = this.loginForm.value;
    try {
      const result = await this.userService.forceLogin(phone);
      this.userService.setActiveUser(result.user, result.token);
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
