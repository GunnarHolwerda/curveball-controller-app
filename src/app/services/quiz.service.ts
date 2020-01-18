import { Injectable } from '@angular/core';
import { AllQuizzesResponse, IQuizResponse, FullQuizResponse, QuizCompleteResponse } from '../models/quizzes';
import { HttpClient } from '@angular/common/http';
import { QuizStartResponse } from '../models/started-quiz';
import { IQuestionResponse, IChoiceResponse } from '../models/question';
import { QuestionsPayload } from '../models/question-payload';
import { QuestionResults } from '../models/question-results';
import { IUser } from '../models/user';
import { Env } from './environment.service';
import { QuestionTopicsResponse } from '../models/question-topics-response';
import { QuestionTypesResponse } from '../models/question-types-response';
import { ApiService } from './api.service';
import { AccountStoreService } from '../stores/account-store.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends ApiService {

  constructor(http: HttpClient, env: Env, accountStore: AccountStoreService) {
    super(http, env, accountStore);
    this.basePath = this.env.quizEndpoint;
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

  completeQuiz(quizId: string): Promise<QuizCompleteResponse> {
    return this.http.post<QuizCompleteResponse>(`${this.basePath}/quizzes/${quizId}/complete`, null, { headers: this.headers }).toPromise();
  }

  resetQuiz(quizId: string): Promise<{ quiz: FullQuizResponse }> {
    return this.http.post<{ quiz: FullQuizResponse }>(
      `${this.basePath}/quizzes/${quizId}/reset`, null, { headers: this.headers }
    ).toPromise();
  }

  deleteQuiz(quizId: string): Promise<void> {
    return this.http.delete<void>(`${this.basePath}/quizzes/${quizId}`, { headers: this.headers }).toPromise();
  }

  questionTopics(): Promise<QuestionTopicsResponse> {
    return this.http.get<QuestionTopicsResponse>(`${this.basePath}/questions/topics`, { headers: this.headers }).toPromise();
  }

  questionTypes(forTopic?: number): Promise<QuestionTypesResponse> {
    return this.http.get<QuestionTypesResponse>(
      `${this.basePath}/questions/type`,
      { headers: this.headers, params: { forTopic: forTopic.toString() } }
    ).toPromise();
  }

  updateChoice(quizId: string, questionId: string, choiceId: string, newChoice: Partial<IChoiceResponse>): Promise<IChoiceResponse> {
    return this.http.put<IChoiceResponse>(
      `${this.basePath}/quizzes/${quizId}/questions/${questionId}/choices/${choiceId}`, newChoice, { headers: this.headers }
    ).toPromise();
  }
}
