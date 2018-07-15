import { Component, OnInit, OnDestroy } from '@angular/core';
import { RealtimeService } from './services/realtime.service';
import { MatSnackBar } from '../../node_modules/@angular/material';
import { Subscription } from '../../node_modules/rxjs';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'cb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private quizRoomSubscription: Subscription;
  private activeQuizzesSubscription: Subscription;

  constructor(private realtime: RealtimeService, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.quizRoomSubscription = this.realtime.quizRoom.subscribe((quiz) => {
      this.snackbar.open(`A quiz ${quiz.title} just started`, 'Dismiss', {
        duration: 5000
      });
    });
    this.activeQuizzesSubscription = this.realtime.activeQuizzes.subscribe((quizzes) => {
      quizzes.forEach((q) => {
        const snackbarRef = this.snackbar.open(`A quiz ${q.title} is currently live!`, 'View', {
          duration: 5000
        });
        snackbarRef.onAction().subscribe(() => this.router.navigate(['/test', q.quizId]));
      });
    });
  }

  ngOnDestroy() {
    this.quizRoomSubscription.unsubscribe();
    this.activeQuizzesSubscription.unsubscribe();
  }

}
