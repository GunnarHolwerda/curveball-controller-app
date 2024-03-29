import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '../../node_modules/@angular/material';
import { Subscription } from '../../node_modules/rxjs';
import { Router } from '../../node_modules/@angular/router';
import { CurrentQuizzes } from './services/current-quizzes.service';
import { AccountStoreService } from './stores/account-store.service';

@Component({
  selector: 'cb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private quizRoomSubscription: Subscription;
  private activeQuizzesSubscription: Subscription;

  constructor(
    private quizzes: CurrentQuizzes,
    private snackbar: MatSnackBar,
    private router: Router,
    private accountStore: AccountStoreService
  ) { }

  ngOnInit() {
    this.accountStore.account$.subscribe(() => {
      this.quizRoomSubscription = this.quizzes.quizStart.subscribe((quiz) => {
        this.snackbar.open(`A quiz ${quiz.title} just started`, 'Dismiss', {
          duration: 5000
        });
      });
      this.activeQuizzesSubscription = this.quizzes.quizzes.subscribe((quizzes) => {
        quizzes.forEach((q) => {
          const snackbarRef = this.snackbar.open(`A quiz ${q.title} is currently live!`, 'View', {
            duration: 5000
          });
          snackbarRef.onAction().subscribe(() => this.router.navigate(['/app', 'quizzes', q.quizId, 'connect']));
        });
      });
    });
  }

  ngOnDestroy() {
    this.quizRoomSubscription.unsubscribe();
    this.activeQuizzesSubscription.unsubscribe();
  }
}
