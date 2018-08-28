import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FullQuizResponse, IQuizResponse } from '../models/quizzes';
import { QuizService } from '../services/quiz.service';
import { IQuestionResponse } from '../models/question';
// @ts-ignore:one-line
import deepEqual from 'deep-equal';
import { RealtimeService } from '../services/realtime.service';
import { IUser } from '../models/user';

@Component({
  selector: 'cb-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  originalQuiz: FullQuizResponse;
  quiz: FullQuizResponse;
  quizRoom: string;
  alivePlayers: Array<IUser> = [];

  constructor(private route: ActivatedRoute, private quizService: QuizService, private realTime: RealtimeService) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.quiz = (await this.quizService.getQuiz(params.quizId)).quiz;
      this.originalQuiz = { ...this.quiz };
      try {
        this.quizRoom = (await this.realTime.getQuizRoom(this.quiz.quizId)).quizId;
      } catch {
        this.quizRoom = undefined;
      }
    });
  }

  hasChanged(): boolean {
    return !deepEqual(this.quiz, this.originalQuiz);
  }

  canStart(): boolean {
    return !this.quiz.completed && this.quizRoom !== undefined && this.quiz.active;
  }

  hasQuizRoom(): boolean {
    return this.quizRoom !== undefined;
  }

  allQuestionsAreSent(): boolean {
    this.quiz.questions.forEach((q) => {
      if (q.sent !== null) {
        return false;
      }
    });
    return true;
  }

  async onComplete(): Promise<void> {
    this.updateQuiz({ completed: true, active: false });
    const { users } = await this.quizService.getParticipants(this.quiz.quizId);
    this.realTime.emitWinners(this.quiz.quizId, users);
  }

  async onUpdate(): Promise<void> {
    const updatedQuiz = { ...this.quiz };
    delete updatedQuiz.questions;
    this.updateQuiz({ ...(updatedQuiz as IQuizResponse) });
  }

  async onCreateQuizRoom(): Promise<void> {
    await this.updateQuiz({ active: true });
    await this.realTime.createQuizRoom(this.quiz);
    this.quizRoom = this.quiz.quizId;
  }

  async onDeleteQuizRoom(): Promise<void> {
    await this.realTime.deleteQuizRoom(this.quiz.quizId);
    this.quizRoom = undefined;
  }

  async onStart(): Promise<void> {
    const response = await this.quizService.startQuiz(this.quiz.quizId);
    await this.realTime.createQuizRoom(response.quiz);
    await this.realTime.emitQuestion(response.firstQuestion, response.token);
    this.replaceQuiz(response.quiz, response.firstQuestion);
  }

  async onQuestionStart(question: IQuestionResponse): Promise<void> {
    const startedQuestion = (await this.quizService.startQuestion(this.quiz.quizId, question.questionId)).question;
    this.realTime.emitQuestion(startedQuestion);
    this.replaceQuestion(startedQuestion);
  }

  async resetQuiz(): Promise<void> {
    const resetQuiz = await this.quizService.resetQuiz(this.quiz.quizId);
    this.replaceQuiz(resetQuiz.quiz);
  }

  async onCalculateResults(question: IQuestionResponse): Promise<void> {
    const results = await this.quizService.calculateResults(this.quiz.quizId, question.questionId);
    this.realTime.emitResults(this.quiz.quizId, results);
    this.quizService.getParticipants(this.quiz.quizId).then(result => this.alivePlayers = result.users);
  }

  private async updateQuiz(quizProperties: Partial<IQuizResponse>): Promise<void> {
    const updatedQuiz = (await this.quizService.updateQuiz(this.quiz.quizId, quizProperties)).quiz;
    this.replaceQuiz(updatedQuiz);
  }

  private replaceQuiz(newQuizData: IQuizResponse, question?: IQuestionResponse): void {
    if (question) {
      this.replaceQuestion(question);
    }
    this.quiz = {
      ...newQuizData,
      questions: this.quiz.questions
    };
    this.originalQuiz = { ...this.quiz };
  }

  private replaceQuestion(question: IQuestionResponse): void {
    const indexOfOriginalQuestion = this.quiz.questions.findIndex(q => q.questionId === question.questionId);
    this.quiz.questions[indexOfOriginalQuestion] = question;
  }

}
