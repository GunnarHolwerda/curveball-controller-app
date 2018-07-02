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

  emitQuestion(question: IQuestionResponse): Promise<IQuestionResponse> {
    return this.http.post<IQuestionResponse>(`${this.path}/${question.quizId}/question:emit`, question).toPromise();
  }

  emitResults(quizId: string, results: QuestionResults): Promise<QuestionResults> {
    return this.http.post<QuestionResults>(`${this.path}/${quizId}/results:emit`, results).toPromise();
  }

  connectToQuiz(quizId: string): SocketIOClient.Socket {
    return socketio.connect(`http://localhost:3001/${quizId}`);
  }
}
