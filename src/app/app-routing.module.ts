import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllQuizzesComponent } from './all-quizzes/all-quizzes.component';
import { TestQuizComponent } from './test-quiz/test-quiz.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';

const routes: Routes = [
  {
    path: 'quizzes', component: RouterOutletComponent, children: [
      { path: '', component: AllQuizzesComponent },
      { path: ':quizId', component: QuizDetailComponent }
    ]
  },
  { path: 'test', component: TestQuizComponent },
  { path: '', redirectTo: 'test', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
