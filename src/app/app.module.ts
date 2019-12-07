import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CurveballMaterialModule } from './curveball-material/curveball-material.module';
import { HttpClientModule } from '@angular/common/http';
import { QuizService } from './services/quiz.service';
import { AppRoutingModule } from './app-routing.module';
import { CurveballNavComponent } from './curveball-nav/curveball-nav.component';
import { Env } from './services/environment.service';
import { LoginComponent } from './login/login.component';
import { RealtimeService } from './services/realtime.service';
import { TestToolsService } from './services/test-tools.service';
import { SharedModule } from './shared/shared.module';
import { SubjectService } from './services/subject.service';
import { RegisterComponent } from './register/register.component';
import { AccountService } from './services/account.service';
import { UserService } from './services/user.service';
import { AccountStoreService } from './stores/account-store.service';
import { DemoTestComponent } from './demo-test/demo-test.component';

@NgModule({
  declarations: [
    AppComponent,
    CurveballNavComponent,
    LoginComponent,
    RegisterComponent,
    DemoTestComponent,
  ],
  imports: [
    BrowserModule,
    CurveballMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    QuizService,
    Env,
    TestToolsService,
    SubjectService,
    AccountService,
    UserService,
    AccountStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(_: RealtimeService) {

  }
}
