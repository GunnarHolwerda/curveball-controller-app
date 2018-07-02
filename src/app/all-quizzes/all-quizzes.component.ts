import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { FullQuizResponse, IQuizResponse } from '../models/quizzes';
import { MatSnackBar, MatSort, MatTableDataSource, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';

@Component({
  selector: 'cb-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.css']
})
export class AllQuizzesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<FullQuizResponse>;
  displayedColumns: Array<string> = ['title', 'questions', 'created', 'completed', 'active'];
  quizzes: Array<FullQuizResponse> = [];
  loading: boolean;

  constructor(private quizService: QuizService, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.loading = true;
    this.quizzes = (await this.quizService.allQuizzes()).quizzes;
    this.loading = false;
    this.dataSource = new MatTableDataSource(this.quizzes);
    this.dataSource.sort = this.sort;
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
