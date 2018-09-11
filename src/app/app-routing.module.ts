import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllQuizzesComponent } from './all-quizzes/all-quizzes.component';
import { TestQuizComponent } from './test-quiz/test-quiz.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ConnectToQuizComponent } from './connect-to-quiz/connect-to-quiz.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'app', children: [
      { path: '', redirectTo: '/app/quizzes', pathMatch: 'full' },
      {
        path: 'quizzes', component: RouterOutletComponent, children: [
          { path: '', component: AllQuizzesComponent },
          { path: 'add', component: AddQuizComponent },
          { path: ':quizId', component: QuizDetailComponent }
        ]
      },
      {
        path: 'test', component: RouterOutletComponent, children: [
          { path: '', component: ConnectToQuizComponent },
          { path: ':quizId', component: TestQuizComponent }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/app/quizzes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
