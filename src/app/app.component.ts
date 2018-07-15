import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealtimeService } from './services/realtime.service';
import { MatSnackBar } from '../../node_modules/@angular/material';
import { Subscription } from '../../node_modules/rxjs';

@Component({
  selector: 'cb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private quizRoomSubscription: Subscription;

  constructor(private realtime: RealtimeService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.quizRoomSubscription = this.realtime.quizRoom.subscribe((quiz) => {
      this.snackbar.open(`A quiz ${quiz.title} just started`, 'Dismiss');
    });
  }

  ngOnDestroy() {
    this.quizRoomSubscription.unsubscribe();
  }

}
