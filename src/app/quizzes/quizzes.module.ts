import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AllQuizzesComponent } from './all-quizzes/all-quizzes.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizSettingsModalComponent } from './quiz-settings-modal/quiz-settings-modal.component';
import { ConnectQuizComponent } from './connect-quiz/connect-quiz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurveballMaterialModule } from '../curveball-material/curveball-material.module';
import { QuestionCreatorComponent } from './question-creator/question-creator.component';
import { ManualQuestionCreatorComponent } from './manual-question-creator/manual-question-creator.component';
import { SpreadQuestionCreatorComponent } from './spread-question-creator/spread-question-creator.component';

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
    QuizDetailComponent,
    ConnectQuizComponent,
    QuizSettingsModalComponent,
    QuestionCreatorComponent,
    ManualQuestionCreatorComponent,
    SpreadQuestionCreatorComponent
  ],
  entryComponents: [
    QuizSettingsModalComponent
  ]
})
export class QuizzesModule { }
