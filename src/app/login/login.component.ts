import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

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
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    try {
      const result = await this.accountService.loginToAccount(email, password);
      // this.accountService.setActiveUser(result.user, result.token);
      // sessionStorage.setItem('quizJwt', result.token);
      sessionStorage.setItem('internalToken', result.token);
      this.router.navigate(['/app']);
    } catch (e) {
      console.error(e);
      // Show login error
      // clear form
    }
  }
}
