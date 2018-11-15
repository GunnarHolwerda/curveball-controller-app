import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';
import { RealtimeService, ActiveQuiz } from '../services/realtime.service';
import { Router } from '../../../node_modules/@angular/router';
import { CurrentQuizzes } from '../services/current-quizzes.service';

@Component({
  selector: 'cb-connect-to-quiz',
  templateUrl: './connect-to-quiz.component.html',
  styleUrls: ['./connect-to-quiz.component.css']
})
export class ConnectToQuizComponent implements OnInit {
  @ViewChild('form') quizForm: NgForm;
  quizzes: Array<ActiveQuiz> = [];

  constructor(private currentQuizzes: CurrentQuizzes, private router: Router) { }

  ngOnInit() {
    this.currentQuizzes.quizzes.subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }

  connectToQuizRoom(quizId: string): void {
    this.router.navigate([quizId]);
  }

  onSubmit() {
    if (this.quizForm.controls['quizId'].value === '') {
      return;
    }
    this.connectToQuizRoom(this.quizForm.controls['quizId'].value);
  }
}
