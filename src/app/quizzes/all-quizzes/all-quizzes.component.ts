import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FullQuizResponse } from 'src/app/models/quizzes';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'cb-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.css']
})
export class AllQuizzesComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
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
