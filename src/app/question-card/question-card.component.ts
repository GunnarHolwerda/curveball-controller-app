import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { IQuestionResponse, IChoiceResponse } from '../models/question';

@Component({
  selector: 'cb-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent implements OnInit, OnChanges {
  @Input() question: IQuestionResponse;
  @Input() disableActions = false;
  @Input() showInfo = true;
  @Input() titleSize = '24px';
  @Output() start: EventEmitter<IQuestionResponse> = new EventEmitter();
  @Output() results: EventEmitter<IQuestionResponse> = new EventEmitter();
  @Output() choiceSelected: EventEmitter<IChoiceResponse> = new EventEmitter();

  secondsRemaining: number;
  countdown: any;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    const { question } = changes;
    if (question && (question.firstChange || question.previousValue.expired !== question.currentValue.expired)) {
      this.startCountdown();
    }
  }

  startCountdown(): void {
    this.secondsRemaining = this.secondsToExpiration();
    this.countdown = setInterval(() => {
      this.secondsRemaining--;
    }, 1000);
    setTimeout(() => {
      clearInterval(this.countdown);
      this.countdown = undefined;
    }, this.secondsRemaining * 1000);
  }

  onChoiceSelect(choice: IChoiceResponse): void {
    this.choiceSelected.emit(choice);
  }

  secondsToExpiration(): number {
    const expirationDate = new Date(this.question.expired);
    const currentTime = new Date();
    return Math.floor(Math.max(0, (expirationDate.getTime() - currentTime.getTime()) / 1000));
  }

  onResultsCalculate(): void {
    this.results.emit(this.question);
  }

  onSend(): void {
    this.start.emit(this.question);
  }

  expired(): boolean {
    return this.secondsRemaining <= 0 || this.countdown === undefined;
  }

}
