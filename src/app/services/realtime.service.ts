import { Injectable } from '@angular/core';
import { IQuestionResponse } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { QuestionResults } from '../models/question-results';
import * as socketio from 'socket.io-client';
import { filter } from 'rxjs/operators';
import { IUser } from '../models/user';
import { IQuizResponse } from '../models/quizzes';
import { Observable, ReplaySubject, Subject } from '../../../node_modules/rxjs';
import { UserService } from './user.service';

import { Env } from './environment.service';

export interface ActiveQuiz {
  quizId: string;
  title: string;
  potAmount: number;
}
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private socket: SocketIOClient.Socket;
  private basePath: string;
  private _quizRoom: Subject<ActiveQuiz> = new Subject();
  private _activeQuizzes: ReplaySubject<Array<ActiveQuiz>> = new ReplaySubject();

  constructor(private http: HttpClient, private userService: UserService, private env: Env) {
    this.basePath = this.env.realtimeEndpoint;
    this.userService.user.pipe(filter(u => u !== null)).subscribe(() => {
      this.socket = socketio.connect(this.basePath, this.socketIoOpts);
      this.socket.on('connect', () => {
        this.socket.on('authenticated', () => {
          this.socket.on('start', (data: ActiveQuiz) => {
            this._quizRoom.next(data);
          });
          this.socket.on('active_quizzes', (data: Array<ActiveQuiz>) => {
            this._activeQuizzes.next(data);
          });
        }).emit('authenticate', { token: this.userService.activeJwt });
      });
    });
  }

  private get headers(): { [header: string]: string } {
    return {
      'Authorization': `Bearer ${this.env.internalToken}`
    };
  }

  private get socketIoOpts(): SocketIOClient.ConnectOpts {
    return {
      transports: ['websocket']
    };
  }

  public get quizRoom(): Observable<ActiveQuiz> {
    return this._quizRoom;
  }

  public get activeQuizzes(): Observable<Array<ActiveQuiz>> {
    return this._activeQuizzes;
  }

  emitQuestion(question: IQuestionResponse, token?: string): Promise<IQuestionResponse> {
    return this.http.post<IQuestionResponse>(
      `${this.basePath}/quizzes/${question.quizId}/question:emit`, { question, token }, { headers: this.headers }
    ).toPromise();
  }

  emitResults(quizId: string, results: QuestionResults): Promise<QuestionResults> {
    return this.http.post<QuestionResults>(
      `${this.basePath}/quizzes/${quizId}/results:emit`,
      results,
      { headers: this.headers }
    ).toPromise();
  }

  emitWinners(quizId: string, finalists: Array<IUser>): Promise<void> {
    return this.http.post<void>(`${this.basePath}/quizzes/${quizId}/winners:emit`, finalists, { headers: this.headers }).toPromise();
  }

  getQuizRoom(quizId: string): Promise<{ quizId: string }> {
    return this.http.get<{ quizId: string }>(`${this.basePath}/quizzes/${quizId}`, { headers: this.headers }).toPromise();
  }

  createQuizRoom(quiz: IQuizResponse): Promise<void> {
    return this.http.post<void>(`${this.basePath}/quizzes`, { quiz }, { headers: this.headers }).toPromise();
  }

  deleteQuizRoom(quizId: string): Promise<void> {
    return this.http.delete<void>(`${this.basePath}/quizzes/${quizId}`, { headers: this.headers }).toPromise();
  }

  async connectToQuiz(quizId: string): Promise<SocketIOClient.Socket> {
    return new Promise<SocketIOClient.Socket>((resolve) => {
      const socket = socketio.connect(`${this.basePath}/${quizId}`, this.socketIoOpts);
      socket.on('connect', () => {
        socket.on('authenticated', () => {
          resolve(socket);
        }).emit('authenticate', { token: this.userService.activeJwt });
      });
    });
  }
}
