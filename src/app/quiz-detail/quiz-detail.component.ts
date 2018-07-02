import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FullQuizResponse } from '../models/quizzes';
import { QuizService } from '../services/quiz.service';
import { IQuestionResponse } from '../models/question';
// @ts-ignore:one-line
import deepEqual from 'deep-equal';
import { RealtimeService } from '../services/realtime.service';

@Component({
  selector: 'cb-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  originalQuiz: FullQuizResponse;
  quiz: FullQuizResponse;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private realTime: RealtimeService) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.quiz = (await this.quizService.getQuiz(params.quizId)).quiz;
      this.originalQuiz = { ...this.quiz };
    });
  }

  hasChanged(): boolean {
    return !deepEqual(this.quiz, this.originalQuiz);
  }

  async onUpdate(): Promise<void> {
    const updatedQuiz = (await this.quizService.updateQuiz(this.quiz.quizId, {
      active: this.quiz.active
    })).quiz;
    this.quiz = {
      ...updatedQuiz,
      questions: this.quiz.questions
    };
    this.originalQuiz = { ...this.quiz };
  }

  async onQuestionStart(question: IQuestionResponse): Promise<void> {
    const startedQuestion = (await this.quizService.startQuestion(this.quiz.quizId, question.questionId)).question;
    this.realTime.emitQuestion(startedQuestion);
    const indexOfOriginalQuestion = this.quiz.questions.findIndex(q => q.questionId === startedQuestion.questionId);
    this.quiz.questions[indexOfOriginalQuestion] = startedQuestion;
  }

}
