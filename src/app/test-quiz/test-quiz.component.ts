import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as socketio from 'socket.io-client';
import { IQuestionResponse, IChoiceResponse } from '../models/question';

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
    localStorage.setItem('quizId', this.quizId);
    this.quizRoom = socketio.connect(`http://localhost:3001/${this.quizId}`);
    this.quizRoom.on('question', (q: IQuestionResponse) => {
      this.questions.push(q);
    });
    this.quizRoom.on('results', (r) => {
      console.log(r);
    });
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
