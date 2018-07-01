import { Injectable } from '@angular/core';
import { AllQuizzesResponse, IQuizResponse, FullQuizResponse } from '../models/quizzes';
import { HttpClient } from '@angular/common/http';
import { QuizStartResponse } from '../models/started-quiz';
import { IQuestionResponse } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private path = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  allQuizzes(): Promise<AllQuizzesResponse> {
    return this.http.get<AllQuizzesResponse>(`${this.path}/quizzes`).toPromise();
  }

  getQuiz(quizId: string): Promise<{ quiz: FullQuizResponse }> {
    return this.http.get<{ quiz: FullQuizResponse }>(`${this.path}/quizzes/${quizId}`).toPromise();
  }

  startQuiz(quizId: string): Promise<QuizStartResponse> {
    return this.http.post<QuizStartResponse>(`${this.path}/quizzes/${quizId}:start`, null).toPromise();
  }

  startQuestion(quizId: string, questionId: string): Promise<{ question: IQuestionResponse }> {
    return this.http.post<{ question: IQuestionResponse }>(
      `${this.path}/quizzes/${quizId}/questions/${questionId}:start`, null
    ).toPromise();
  }
}
