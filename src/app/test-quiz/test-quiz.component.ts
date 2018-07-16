import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IQuestionResponse, IChoiceResponse, ITokenResponse } from '../models/question';
import { RealtimeService } from '../services/realtime.service';
import { ActivatedRoute, Params } from '../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../node_modules/@angular/material';

@Component({
  selector: 'cb-test-quiz',
  templateUrl: './test-quiz.component.html',
  styleUrls: ['./test-quiz.component.css']
})
export class TestQuizComponent implements OnInit, OnDestroy {
  quizRoom: SocketIOClient.Socket;
  quizId: string;
  questions: Array<IQuestionResponse> = [];

  constructor(private route: ActivatedRoute, private realTime: RealtimeService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.quizId = params.quizId;
      try {
        await this.realTime.getQuizRoom(this.quizId);
        this.connectToQuizRoom();
      } catch (e) {
        this.snackbar.open(`Quiz with id ${this.quizId} does not exist`);
      }
    });
  }

  ngOnDestroy() {
    if (this.quizRoom && this.quizRoom.connected) {
      this.quizRoom.disconnect();
    }
  }

  connectToQuizRoom() {
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
  }

  selectChoice(choice: IChoiceResponse): void {
    console.log(choice);
  }

  onDisconnect() {
    this.quizRoom.disconnect();
    this.questions = [];
  }
}
