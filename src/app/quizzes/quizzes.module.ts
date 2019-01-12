import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AllQuizzesComponent } from './all-quizzes/all-quizzes.component';
import { ConnectToQuizComponent } from './connect-to-quiz/connect-to-quiz.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizSettingsModalComponent } from './quiz-settings-modal/quiz-settings-modal.component';
import { TestQuizComponent } from './test-quiz/test-quiz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurveballMaterialModule } from '../curveball-material/curveball-material.module';

@NgModule({
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    SharedModule,
    CurveballMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddQuizComponent,
    AllQuizzesComponent,
    ConnectToQuizComponent,
    QuizDetailComponent,
    TestQuizComponent,
    QuizSettingsModalComponent
  ],
  entryComponents: [
    QuizSettingsModalComponent
  ]
})
export class QuizzesModule { }
