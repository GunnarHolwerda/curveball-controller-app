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
  currentPage = 1;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      details: new FormGroup({
        networkName: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
      }),
      credentials: new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      })
    });
  }

  public nextPage(): void {
    this.currentPage++;
  }

  public backPage(): void {
    this.currentPage--;
  }

  public async register(): Promise<void> {
    if (this.registerForm.invalid) {
      return;
    }
    const { details, credentials } = this.registerForm.value;
    try {
      await this.accountService.createAccount({
        firstName: details.firstName,
        lastName: details.lastName,
        email: credentials.email,
        password: credentials.password,
        network: {
          name: details.networkName
        }
      });
      await this.login(credentials.email, credentials.password);
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
