import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { FullQuizResponse } from '../models/quizzes';

@Component({
  selector: 'cb-all-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.css']
})
export class AllQuizzesComponent implements OnInit {
  quizzes: Array<FullQuizResponse> = [];

  constructor(private quizService: QuizService) { }

  async ngOnInit() {
    this.quizzes = (await this.quizService.allQuizzes()).quizzes;
  }

}
