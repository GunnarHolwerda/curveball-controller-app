import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutletComponent } from './router-outlet/router-outlet.component';
import { ResultsCardComponent } from './results-card/results-card.component';
import { WarningBannerComponent } from './warning-banner/warning-banner.component';
import { QuestionCardComponent } from './question-card/question-card.component';
import { RouterModule } from '@angular/router';
import { CurveballMaterialModule } from '../curveball-material/curveball-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CurveballMaterialModule
  ],
  declarations: [
    RouterOutletComponent,
    ResultsCardComponent,
    WarningBannerComponent,
    QuestionCardComponent
  ],
  exports: [
    RouterOutletComponent,
    ResultsCardComponent,
    WarningBannerComponent,
    QuestionCardComponent
  ]
})
export class SharedModule { }
