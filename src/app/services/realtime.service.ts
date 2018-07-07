import { Injectable } from '@angular/core';
import { IQuestionResponse } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { QuestionResults } from '../models/question-results';
import * as socketio from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private path = 'http://localhost:3001';
  constructor(private http: HttpClient) { }

  emitQuestion(question: IQuestionResponse, token?: string): Promise<IQuestionResponse> {
    return this.http.post<IQuestionResponse>(`${this.path}/quizzes/${question.quizId}/question:emit`, { question, token }).toPromise();
  }

  emitResults(quizId: string, results: QuestionResults): Promise<QuestionResults> {
    return this.http.post<QuestionResults>(`${this.path}/quizzes/${quizId}/results:emit`, results).toPromise();
  }

  getQuizRoom(quizId: string): Promise<{ quizId: string }> {
    return this.http.get<{ quizId: string }>(`${this.path}/quizzes/${quizId}`).toPromise();
  }

  createQuizRoom(quizId: string): Promise<void> {
    return this.http.post<void>(`${this.path}/quizzes`, { quizId }).toPromise();
  }

  deleteQuizRoom(quizId: string): Promise<void> {
    return this.http.delete<void>(`${this.path}/quizzes/${quizId}`).toPromise();
  }

  connectToQuiz(quizId: string): SocketIOClient.Socket {
    return socketio.connect(`http://localhost:3001/quizzes/${quizId}`);
  }
}
