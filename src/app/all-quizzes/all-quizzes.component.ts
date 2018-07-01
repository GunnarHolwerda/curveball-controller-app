import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { FullQuizResponse, IQuizResponse } from '../models/quizzes';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'cb-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.css']
})
export class AllQuizzesComponent implements OnInit {
  quizzes: Array<FullQuizResponse> = [];

  constructor(private quizService: QuizService, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.quizzes = (await this.quizService.allQuizzes()).quizzes;
  }

  async startQuiz(quiz: IQuizResponse): Promise<void> {
    try {
      await this.quizService.startQuiz(quiz.quizId);
    } catch (e) {
      console.log(e);
      if (e.status === 409) {
        this.snackBar.open(`Action failed: ${e.error.message}`, 'Dismiss');
      }
    }
  }
}
