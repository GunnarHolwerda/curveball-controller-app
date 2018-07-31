import { Injectable } from '@angular/core';
import { AllQuizzesResponse, IQuizResponse, FullQuizResponse } from '../models/quizzes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuizStartResponse } from '../models/started-quiz';
import { IQuestionResponse } from '../models/question';
import { QuestionsPayload } from '../models/question-payload';
import { QuestionResults } from '../models/question-results';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private path = 'https://localhost:3000';
  private headers: { [header: string]: string };
  constructor(private http: HttpClient) {
    this.headers = {
      'Authorization': `Bearer ${environment.internalToken}`
    };
  }

  allQuizzes(): Promise<AllQuizzesResponse> {
    return this.http.get<AllQuizzesResponse>(`${this.path}/quizzes`, { headers: this.headers }).toPromise();
  }

  updateQuiz(quizId: string, properties: Partial<IQuizResponse>): Promise<{ quiz: IQuizResponse }> {
    return this.http.put<{ quiz: IQuizResponse }>(`${this.path}/quizzes/${quizId}`, properties, { headers: this.headers }).toPromise();
  }

  getQuiz(quizId: string): Promise<{ quiz: FullQuizResponse }> {
    return this.http.get<{ quiz: FullQuizResponse }>(`${this.path}/quizzes/${quizId}`, { headers: this.headers }).toPromise();
  }

  startQuiz(quizId: string): Promise<QuizStartResponse> {
    return this.http.post<QuizStartResponse>(`${this.path}/quizzes/${quizId}:start`, null, { headers: this.headers }).toPromise();
  }

  startQuestion(quizId: string, questionId: string): Promise<{ question: IQuestionResponse }> {
    return this.http.post<{ question: IQuestionResponse }>(
      `${this.path}/quizzes/${quizId}/questions/${questionId}:start`, null, { headers: this.headers }
    ).toPromise();
  }

  createQuiz(quiz: Partial<IQuizResponse>): Promise<{ quiz: IQuizResponse }> {
    return this.http.post<{ quiz: IQuizResponse }>(`${this.path}/quizzes`, quiz, { headers: this.headers }).toPromise();
  }

  addQuestions(quizId: string, questions: QuestionsPayload): Promise<{ questions: Array<string> }> {
    return this.http.post<{ questions: Array<string> }>(
      `${this.path}/quizzes/${quizId}/questions`, questions, { headers: this.headers }
    ).toPromise();
  }

  calculateResults(quizId: string, questionId: string): Promise<QuestionResults> {
    return this.http.get<QuestionResults>(
      `${this.path}/quizzes/${quizId}/questions/${questionId}:results`, { headers: this.headers }
    ).toPromise();
  }

  getParticipants(quizId: string): Promise<{ users: Array<IUser> }> {
    return this.http.get<{ users: Array<IUser> }>(`${this.path}/quizzes/${quizId}/users`, { headers: this.headers }).toPromise();
  }
}
