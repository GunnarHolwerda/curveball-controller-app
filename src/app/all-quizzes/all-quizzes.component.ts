import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { FullQuizResponse } from '../models/quizzes';
import { MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

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

  ngOnInit() {
    this.loading = true;
    this.quizService.allQuizzes().then(({ quizzes }) => {
      this.quizzes = quizzes;
      this.dataSource = new MatTableDataSource(this.quizzes);
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }
}
