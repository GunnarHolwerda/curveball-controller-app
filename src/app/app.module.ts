import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CurveballMaterialModule } from './curveball-material/curveball-material.module';
import { TestQuizComponent } from './test-quiz/test-quiz.component';
import { QuestionCardComponent } from './question-card/question-card.component';
import { AllQuizzesComponent } from './all-quizzes/all-quizzes.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizService } from './services/quiz.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    TestQuizComponent,
    QuestionCardComponent,
    AllQuizzesComponent
  ],
  imports: [
    BrowserModule,
    CurveballMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    QuizService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
