import { Component, OnInit } from '@angular/core';
import { RealtimeService } from '../services/realtime.service';

@Component({
  selector: 'cb-demo-test',
  templateUrl: './demo-test.component.html',
  styleUrls: ['./demo-test.component.css']
})
export class DemoTestComponent implements OnInit {

  constructor(private realtime: RealtimeService) { }

  ngOnInit() {
    this.realtime.connectToQuiz('slamball_demo').then(socket => {
      console.log('Connected to slamball_demo');
      socket.on('*', data => {
        console.log('Event received', data);
      });
    });
  }

}
