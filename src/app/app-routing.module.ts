import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserGuard } from './user.guard';
import { RegisterComponent } from './register/register.component';
import { LoggedOutGuard } from './logged-out.guard';

const routes: Routes = [
  { path: 'login', canActivate: [LoggedOutGuard], component: LoginComponent },
  { path: 'register', canActivate: [LoggedOutGuard], component: RegisterComponent },
  {
    path: 'app', canActivate: [UserGuard], canActivateChild: [UserGuard], children: [
      { path: '', redirectTo: 'quizzes', pathMatch: 'full' },
      {
        path: 'quizzes',
        loadChildren: './quizzes/quizzes.module#QuizzesModule'
      },
      {
        path: 'teleprompter',
        loadChildren: './teleprompter/teleprompter.module#TeleprompterModule'
      }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoggedOutGuard]
})
export class AppRoutingModule { }
