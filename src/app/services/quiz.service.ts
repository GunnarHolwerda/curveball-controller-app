import { Injectable } from '@angular/core';
import { AllQuizzesResponse, IQuizResponse, FullQuizResponse } from '../models/quizzes';
import { HttpClient } from '@angular/common/http';
import { QuizStartResponse } from '../models/started-quiz';
import { IQuestionResponse } from '../models/question';
import { QuestionsPayload } from '../models/question-payload';
import { QuestionResults } from '../models/question-results';
import { IUser } from '../models/user';
import { Env } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private basePath: string;

  constructor(private http: HttpClient, private env: Env) {
    this.basePath = this.env.quizEndpoint;
  }

  private get headers(): { [header: string]: string } {
    return {
      'Authorization': `Bearer ${this.env.internalToken}`
    };
  }

  allQuizzes(): Promise<AllQuizzesResponse> {
    return this.http.get<AllQuizzesResponse>(`${this.basePath}/quizzes`, { headers: this.headers }).toPromise();
  }

  updateQuiz(quizId: string, properties: Partial<IQuizResponse>): Promise<{ quiz: IQuizResponse }> {
    return this.http.put<{ quiz: IQuizResponse }>(`${this.basePath}/quizzes/${quizId}`, properties, { headers: this.headers }).toPromise();
  }

  getQuiz(quizId: string): Promise<{ quiz: FullQuizResponse }> {
    return this.http.get<{ quiz: FullQuizResponse }>(`${this.basePath}/quizzes/${quizId}`, { headers: this.headers }).toPromise();
  }

  startQuiz(quizId: string): Promise<QuizStartResponse> {
    return this.http.post<QuizStartResponse>(`${this.basePath}/quizzes/${quizId}/start`, null, { headers: this.headers }).toPromise();
  }

  startQuestion(quizId: string, questionId: string): Promise<{ question: IQuestionResponse }> {
    return this.http.post<{ question: IQuestionResponse }>(
      `${this.basePath}/quizzes/${quizId}/questions/${questionId}/start`, null, { headers: this.headers }
    ).toPromise();
  }

  createQuiz(quiz: Partial<IQuizResponse>): Promise<{ quiz: IQuizResponse }> {
    return this.http.post<{ quiz: IQuizResponse }>(`${this.basePath}/quizzes`, quiz, { headers: this.headers }).toPromise();
  }

  addQuestions(quizId: string, questions: QuestionsPayload): Promise<{ questions: Array<string> }> {
    return this.http.post<{ questions: Array<string> }>(
      `${this.basePath}/quizzes/${quizId}/questions`, questions, { headers: this.headers }
    ).toPromise();
  }

  calculateResults(quizId: string, questionId: string): Promise<QuestionResults> {
    return this.http.get<QuestionResults>(
      `${this.basePath}/quizzes/${quizId}/questions/${questionId}/results`, { headers: this.headers }
    ).toPromise();
  }

  getParticipants(quizId: string): Promise<{ users: Array<IUser> }> {
    return this.http.get<{ users: Array<IUser> }>(`${this.basePath}/quizzes/${quizId}/users`, { headers: this.headers }).toPromise();
  }

  resetQuiz(quizId: string): Promise<{ quiz: FullQuizResponse }> {
    return this.http.post<{ quiz: FullQuizResponse }>(
      `${this.basePath}/quizzes/${quizId}/reset`, null, { headers: this.headers }
    ).toPromise();
  }
}
