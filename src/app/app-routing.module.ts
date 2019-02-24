import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserGuard } from './user.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
