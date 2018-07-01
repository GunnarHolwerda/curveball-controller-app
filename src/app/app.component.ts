import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as socketio from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  @ViewChild('form') quizForm: NgForm;
  quizRoom: SocketIOClient.Socket;

  ngOnDestroy() {
    if (this.quizRoom && this.quizRoom.connected) {
      this.quizRoom.disconnect();
    }
  }

  onDisconnect() {
    this.quizRoom.disconnect();
  }

  onSubmit() {
    console.log(this.quizForm.value);
    this.quizRoom = socketio.connect(`http://localhost:3001/${this.quizForm.value.quizId}`);
    this.quizRoom.on('question', (q) => {
      console.log(q);
    });
    this.quizRoom.on('results', (r) => {
      console.log(r);
    });
  }
}
