import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TeleprompterComponent } from './prompter/teleprompter.component';
import { TeleprompterRoutingModule } from './teleprompter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TeleprompterRoutingModule
  ],
  declarations: [
    TeleprompterComponent
  ]
})
export class TeleprompterModule { }
