import { Injectable } from '@angular/core';
import { IQuestionResponse } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { QuestionResults } from '../models/question-results';
import * as socketio from 'socket.io-client';
import { filter } from 'rxjs/operators';
import { IUser } from '../models/user';
import { IQuizResponse } from '../models/quizzes';
import { UserService } from './user.service';

import { Env } from './environment.service';
import { CurrentQuizzes } from './current-quizzes.service';

export interface ActiveQuiz {
  quizId: string;
  title: string;
  potAmount: number;
  numQuestions: number;
}

export interface QuizStartEvent {
  quiz: ActiveQuiz;
  ticker: Array<{ sport: string, ticker: string }>;
}
@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private socket: SocketIOClient.Socket;
  private basePath: string;

  constructor(private http: HttpClient, private userService: UserService, private env: Env, private quizzes: CurrentQuizzes) {
    this.basePath = this.env.realtimeEndpoint;
    this.userService.user.pipe(filter(u => u !== null)).subscribe(() => {
      this.socket = socketio.connect(this.basePath, this.socketIoOpts);
      this.socket.on('connect', () => {
        this.socket.on('authenticated', () => {
          this.socket.on('start', (data: QuizStartEvent) => {
            this.quizzes.startQuiz(data.quiz);
          });
          this.socket.on('active_quizzes', (data: Array<ActiveQuiz>) => {
            this.quizzes.addQuiz(data);
          });
        }).emit('authenticate', { token: this.userService.activeJwt });
      });
    });
  }

  private get apiPath(): string {
    return this.basePath + '/realtime';
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

  emitComplete(quizId: string): Promise<void> {
    return this.http.post<void>(`${this.apiPath}/quizzes/${quizId}/complete:emit`, {}, { headers: this.headers }).toPromise();
  }

  emitQuestion(question: IQuestionResponse, token?: string): Promise<IQuestionResponse> {
    return this.http.post<IQuestionResponse>(
      `${this.apiPath}/quizzes/${question.quizId}/question:emit`,
      { question, settings: { timeToDisplay: 15 }, token },
      { headers: this.headers }
    ).toPromise();
  }

  emitResults(quizId: string, results: QuestionResults): Promise<QuestionResults> {
    return this.http.post<QuestionResults>(
      `${this.apiPath}/quizzes/${quizId}/results:emit`,
      results,
      { headers: this.headers }
    ).toPromise();
  }

  emitWinners(quizId: string, winners: Array<IUser>, amountWon): Promise<void> {
    return this.http.post<void>(`${this.apiPath}/quizzes/${quizId}/winners:emit`, {
      users: winners,
      amountWon
    }, { headers: this.headers }).toPromise();
  }

  getQuizRoom(quizId: string): Promise<{ quizId: string }> {
    return this.http.get<{ quizId: string }>(`${this.apiPath}/quizzes/${quizId}`, { headers: this.headers }).toPromise();
  }

  createQuizRoom(quiz: IQuizResponse, ticker: Array<{ sport: string, ticker: string }>, numQuestions: number): Promise<void> {
    const payload = {
      quiz: { ...quiz, numQuestions },
      ticker
    };
    return this.http.post<void>(`${this.apiPath}/quizzes`, payload, { headers: this.headers }).toPromise();
  }

  deleteQuizRoom(quizId: string): Promise<void> {
    return this.http.delete<void>(`${this.apiPath}/quizzes/${quizId}`, { headers: this.headers }).toPromise();
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
