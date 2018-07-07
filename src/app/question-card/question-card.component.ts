import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IQuestionResponse, IChoiceResponse } from '../models/question';

@Component({
  selector: 'cb-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent implements OnInit {
  @Input() question: IQuestionResponse;
  @Input() disableActions = false;
  @Output() start: EventEmitter<IQuestionResponse> = new EventEmitter();
  @Output() results: EventEmitter<IQuestionResponse> = new EventEmitter();
  @Output() choiceSelected: EventEmitter<IChoiceResponse> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onChoiceSelect(choice: IChoiceResponse): void {
    this.choiceSelected.emit(choice);
  }

  onResultsCalculate(): void {
    this.results.emit(this.question);
  }

  onSend(): void {
    this.start.emit(this.question);
  }

}
