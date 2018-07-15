import { Injectable } from '@angular/core';
import { IQuestionResponse } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { QuestionResults } from '../models/question-results';
import * as socketio from 'socket.io-client';
import { IUser } from '../models/user';
import { IQuizResponse } from '../models/quizzes';
import { Observable, Observer } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private socket: SocketIOClient.Socket;
  private path = 'http://localhost:3001';
  private _quizRoom: Observable<IQuizResponse>;

  constructor(private http: HttpClient) {
    this.socket = socketio.connect(this.path);
    this._quizRoom = new Observable((observer: Observer<IQuizResponse>) => {
      this.socket.on('start', (data: IQuizResponse) => {
        observer.next(data);
      });
    });
  }

  public get quizRoom(): Observable<IQuizResponse> {
    return this._quizRoom;
  }

  emitQuestion(question: IQuestionResponse, token?: string): Promise<IQuestionResponse> {
    return this.http.post<IQuestionResponse>(`${this.path}/quizzes/${question.quizId}/question:emit`, { question, token }).toPromise();
  }

  emitResults(quizId: string, results: QuestionResults): Promise<QuestionResults> {
    return this.http.post<QuestionResults>(`${this.path}/quizzes/${quizId}/results:emit`, results).toPromise();
  }

  emitWinners(quizId: string, finalists: Array<IUser>): Promise<void> {
    return this.http.post<void>(`${this.path}/quizzes/${quizId}/winners:emit`, finalists).toPromise();
  }

  getQuizRoom(quizId: string): Promise<{ quizId: string }> {
    return this.http.get<{ quizId: string }>(`${this.path}/quizzes/${quizId}`).toPromise();
  }

  createQuizRoom(quiz: IQuizResponse): Promise<void> {
    return this.http.post<void>(`${this.path}/quizzes`, { quiz }).toPromise();
  }

  deleteQuizRoom(quizId: string): Promise<void> {
    return this.http.delete<void>(`${this.path}/quizzes/${quizId}`).toPromise();
  }

  connectToQuiz(quizId: string): SocketIOClient.Socket {
    return socketio.connect(`${this.path}/${quizId}`);
  }
}
