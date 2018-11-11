import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IQuestionResponse, IChoiceResponse, ITokenResponse } from '../models/question';
import { RealtimeService } from '../services/realtime.service';
import { ActivatedRoute, Params } from '../../../node_modules/@angular/router';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import { QuestionResults } from '../models/question-results';
import { IUser } from '../models/user';
import { QuizService } from '../services/quiz.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'cb-test-quiz',
  templateUrl: './test-quiz.component.html',
  styleUrls: ['./test-quiz.component.css']
})
export class TestQuizComponent implements OnInit, OnDestroy {
  quizRoom: SocketIOClient.Socket;
  quizId: string;
  events: Array<{ type: string, value: any }> = [];
  connectedUsers: Array<IUser> = [];

  constructor(
    private route: ActivatedRoute,
    private realTime: RealtimeService,
    private snackbar: MatSnackBar,
    private quizService: QuizService,
    private userService: UserService
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
    this.quizRoom.on('num_connected', async (count: number) => {
      console.log('num_connected', count);
      const results = await this.quizService.getParticipants(this.quizId);
      console.log(results);
      this.connectedUsers = results.connected;
    });
    this.quizRoom.on('user_connected', async (data: { userId: string }) => {
      console.log('a user connected');
      const user = await this.userService.getUser(data.userId);
      this.connectedUsers.push(user);
    });
    this.quizRoom.on('user_disconnected', (data: { userId: string }) => {
      console.log('a user disconnected');
      this.connectedUsers = this.connectedUsers.filter((u) => u.userId === data.userId);
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
