import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrentQuizzes } from '../../services/current-quizzes.service';
import { QuizService } from '../../services/quiz.service';
import { FullQuizResponse } from '../../models/quizzes';
import { RealtimeService } from '../../services/realtime.service';
import { QuestionResults } from '../../models/question-results';
import { IQuestionResponse } from '../../models/question';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'cb-teleprompter',
  templateUrl: './teleprompter.component.html',
  styleUrls: ['./teleprompter.component.css']
})
export class TeleprompterComponent implements OnInit, OnDestroy {
  quizzesSubscription: Subscription;
  quiz: FullQuizResponse;
  questions: Array<IQuestionResponse> = [];
  numConnected: number;
  _socket: SocketIOClient.Socket;
  nextQuestion: IQuestionResponse;
  currentResults: QuestionResults;

  constructor(private currentQuizzes: CurrentQuizzes, private quizService: QuizService, private realTime: RealtimeService) { }

  ngOnInit() {
    this.quizzesSubscription = this.currentQuizzes.quizStart.subscribe(async (quiz) => {
      this.quiz = (await this.quizService.getQuiz(quiz.quizId)).quiz;
      this.questions = this.quiz.questions;
      this.pushQuestion();
      this.socket = await this.realTime.connectToQuiz(this.quiz.quizId);
    });
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.close();
    }
    this.quizzesSubscription.unsubscribe();
  }

  set socket(socket: SocketIOClient.Socket) {
    if (this._socket) {
      this._socket.close();
    }
    this._socket = socket;
    this.socket.on('num_connected', (data) => {
      this.numConnected = data;
    });
    this.socket.on('user_connected', () => {
      this.numConnected++;
    });
    this.socket.on('user_disconnected', () => {
      this.numConnected--;
    });
    this.socket.on('results', (results: QuestionResults) => {
      this.pushResults(results);
      setTimeout(() => {
        this.clearResults();
        this.pushQuestion();
      }, 10000);
    });
    this.socket.on('complete', () => {
      this._socket = undefined;
      this.quiz = undefined;
      this.nextQuestion = undefined;
      this.currentResults = undefined;
      this.questions = [];
    });
  }

  get socket(): SocketIOClient.Socket {
    return this._socket;
  }

  private pushQuestion(): void {
    if (this.questions.length > 0) {
      this.nextQuestion = this.questions.shift();
    }
  }

  private pushResults(results: QuestionResults) {
    this.currentResults = results;
  }

  private clearResults(): void {
    this.currentResults = undefined;
  }
}
