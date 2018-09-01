import { Component, OnInit, Input } from '@angular/core';
import { IQuestionResponse, IChoiceResponse } from '../models/question';
import { QuestionResults } from '../models/question-results';

@Component({
  selector: 'cb-results-card',
  templateUrl: './results-card.component.html',
  styleUrls: ['./results-card.component.css']
})
export class ResultsCardComponent implements OnInit {
  @Input() question: IQuestionResponse;
  @Input() results: QuestionResults;

  constructor() { }

  ngOnInit() {
  }

  choice(question: IQuestionResponse, choiceId: string): IChoiceResponse {
    return question.choices.find(c => c.choiceId === choiceId);
  }

  choiceIds(results: object): Array<string> {
    return Object.keys(results);
  }

  isAnswer(choiceId: string): boolean {
    return this.results.correctAnswer === choiceId;
  }

}
