import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IQuestionResponse, IChoiceResponse, ITokenResponse } from '../models/question';
import { RealtimeService } from '../services/realtime.service';
import { ActivatedRoute, Params } from '../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import { QuestionResults } from '../models/question-results';
import { IUser } from '../models/user';
import { CurrentQuizzes } from '../services/current-quizzes.service';

@Component({
  selector: 'cb-test-quiz',
  templateUrl: './test-quiz.component.html',
  styleUrls: ['./test-quiz.component.css']
})
export class TestQuizComponent implements OnInit, OnDestroy {
  quizRoom: SocketIOClient.Socket;
  quizId: string;
  events: Array<{ type: string, value: any }> = [];
  numConnectedUsers = 0;

  constructor(
    private route: ActivatedRoute,
    private realTime: RealtimeService,
    private snackbar: MatSnackBar,
    private currentQuizzes: CurrentQuizzes
  ) { }

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

  async connectToQuizRoom(): Promise<void> {
    this.quizRoom = await this.realTime.connectToQuiz(this.quizId);
    this.quizRoom.on('question', (q: { question: IQuestionResponse } & ITokenResponse) => {
      this.addEvent('question', q.question);
    });
    this.quizRoom.on('results', (r: QuestionResults) => {
      this.addEvent('results', r);
    });
    this.quizRoom.on('winners', (w: { users: Array<IUser>, amountWon: string }) => {
      this.addEvent('winners', w.users);
    });
    this.quizRoom.on('num_connected', (count: number) => {
      this.numConnectedUsers = count;
      console.log('num_connected', count);
    });
    this.quizRoom.on('user_connected', () => {
      this.numConnectedUsers++;
      console.log('a user connected');
    });
    this.quizRoom.on('user_disconnected', () => {
      this.numConnectedUsers--;
      console.log('a user disconnected');
    });
    this.quizRoom.on('complete', () => {
      this.currentQuizzes.removeQuiz(this.quizId);
    });
  }

  addEvent(type: string, value: any): void {
    console.log(type, value);
    this.events.push({ type, value });
  }

  selectChoice(choice: IChoiceResponse): void {
    console.log(choice);
  }

  question(index: number): IQuestionResponse {
    return this.events[index].value;
  }

  onDisconnect() {
    this.quizRoom.disconnect();
    this.events = [];
  }
}
