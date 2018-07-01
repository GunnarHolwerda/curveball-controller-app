import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FullQuizResponse } from '../models/quizzes';
import { QuizService } from '../services/quiz.service';
import { IQuestionResponse } from '../models/question';

@Component({
  selector: 'cb-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  quiz: FullQuizResponse;

  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.quiz = (await this.quizService.getQuiz(params.quizId)).quiz;
    });
  }

  async onQuestionStart(question: IQuestionResponse): Promise<void> {
    const startedQuestion = (await this.quizService.startQuestion(this.quiz.quizId, question.questionId)).question;
    const indexOfOriginalQuestion = this.quiz.questions.findIndex(q => q.questionId === startedQuestion.questionId);
    this.quiz.questions[indexOfOriginalQuestion] = startedQuestion;
  }

}
