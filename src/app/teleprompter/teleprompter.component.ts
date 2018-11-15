import { Component, OnInit } from '@angular/core';
import { CurrentQuizzes } from '../services/current-quizzes.service';
import { QuizService } from '../services/quiz.service';
import { FullQuizResponse } from '../models/quizzes';
import { RealtimeService } from '../services/realtime.service';
import { QuestionResults } from '../models/question-results';
import { IQuestionResponse } from '../models/question';

@Component({
  selector: 'cb-teleprompter',
  templateUrl: './teleprompter.component.html',
  styleUrls: ['./teleprompter.component.css']
})
export class TeleprompterComponent implements OnInit {
  quiz: FullQuizResponse;
  questions: Array<IQuestionResponse> = [];
  numConnected: number;
  _socket: SocketIOClient.Socket;
  items: Array<{ type: 'question' | 'results', value: QuestionResults | IQuestionResponse }> = [];

  constructor(private currentQuizzes: CurrentQuizzes, private quizService: QuizService, private realTime: RealtimeService) { }

  ngOnInit() {
    this.currentQuizzes.quizStart.subscribe(async (quiz) => {
      console.log('quizstart', quiz);
      this.quiz = (await this.quizService.getQuiz(quiz.quizId)).quiz;
      this.questions = this.quiz.questions;
      this.pushQuestion();
      this.socket = await this.realTime.connectToQuiz(this.quiz.quizId);
    });
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
      this.pushQuestion();
    });
    this.socket.on('complete', () => {
      this.items = [];
      this._socket = undefined;
      this.quiz = undefined;
      this.questions = [];
    });
  }

  get socket(): SocketIOClient.Socket {
    return this._socket;
  }

  private pushQuestion(): void {
    if (this.questions.length > 0) {
      this.items.push({ type: 'question', value: this.questions.shift() });
    }
  }

  private pushResults(results: QuestionResults) {
    this.items.push({ type: 'results', value: results });
  }
}
