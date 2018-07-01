import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllQuizzesComponent } from './all-quizzes/all-quizzes.component';
import { TestQuizComponent } from './test-quiz/test-quiz.component';

const routes: Routes = [
  { path: 'quizzes', component: AllQuizzesComponent },
  { path: 'test', component: TestQuizComponent },
  { path: '', redirectTo: 'test', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
