import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { CurveballNavComponent } from './curveball-nav/curveball-nav.component';
import { ConnectToQuizComponent } from './connect-to-quiz/connect-to-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    TestQuizComponent,
    QuestionCardComponent,
    AllQuizzesComponent,
    QuizDetailComponent,
    RouterOutletComponent,
    AddQuizComponent,
    CurveballNavComponent,
    ConnectToQuizComponent
  ],
  imports: [
    BrowserModule,
    CurveballMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    QuizService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
