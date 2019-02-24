import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      networkName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public async register(): Promise<void> {
    if (this.registerForm.invalid) {
      return;
    }
    const { networkName, email, password } = this.registerForm.value;
    try {
      await this.accountService.createAccount(email, password, networkName);
      await this.login(email, password);
    } catch (e) {
      console.error('Error creating account', e);
    }
  }

  public async login(email: string, password: string): Promise<void> {
    try {
      await this.accountService.loginToAccount(email, password);
      await this.router.navigate(['/app']);
    } catch (e) {
      console.error('Error logging into account', e);
    }
  }
}
