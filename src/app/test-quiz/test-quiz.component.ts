import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as socketio from 'socket.io-client';
import { IQuestionResponse, IChoiceResponse, ITokenResponse } from '../models/question';
import { RealtimeService } from '../services/realtime.service';
import { MatSnackBar } from '../../../node_modules/@angular/material';

@Component({
  selector: 'cb-test-quiz',
  templateUrl: './test-quiz.component.html',
  styleUrls: ['./test-quiz.component.css']
})
export class TestQuizComponent implements OnInit, OnDestroy {
  @ViewChild('form') quizForm: NgForm;
  quizRoom: SocketIOClient.Socket;
  quizId: string;
  questions: Array<IQuestionResponse> = [];

  constructor(private realTime: RealtimeService, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.quizId = localStorage.getItem('quizId');
    if (this.quizId) {
      this.connectToQuizRoom();
    }
  }

  ngOnDestroy() {
    if (this.quizRoom && this.quizRoom.connected) {
      this.quizRoom.disconnect();
    }
  }

  connectToQuizRoom(): void {
    if (!this.quizId) {
      throw new Error('Attempted to connect to quizRoom without an id');
    }
    try {
      this.realTime.getQuizRoom(this.quizId);
      localStorage.setItem('quizId', this.quizId);
      this.quizRoom = this.realTime.connectToQuiz(this.quizId);
      this.quizRoom.on('question', (q: { question: IQuestionResponse } & ITokenResponse) => {
        this.questions.push(q.question);
      });
      this.quizRoom.on('results', (r) => {
        console.log('results', r);
      });
      this.quizRoom.on('winners', (r) => {
        console.log('winners', r);
      });
    } catch (e) {
      this.snackBar.open(`Quiz room does not exist`, 'Dismiss');
    }
  }

  selectChoice(choice: IChoiceResponse): void {
    console.log(choice);
  }

  onDisconnect() {
    this.quizRoom.disconnect();
    this.questions = [];
  }

  onSubmit() {
    this.connectToQuizRoom();
  }
}
