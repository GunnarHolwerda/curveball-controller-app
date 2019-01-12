import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllQuizzesComponent } from './all-quizzes/all-quizzes.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { ConnectQuizComponent } from './connect-quiz/connect-quiz.component';

const routes: Routes = [
  { path: '', component: AllQuizzesComponent, pathMatch: 'full', },
  { path: 'add', component: AddQuizComponent },
  { path: ':quizId', component: QuizDetailComponent },
  { path: ':quizId/connect', component: ConnectQuizComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
