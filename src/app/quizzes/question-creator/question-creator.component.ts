import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuizService } from 'src/app/services/quiz.service';
import { QuestionType } from 'src/app/models/question-types-response';
import { QuestionTopic } from 'src/app/models/question-topics-response';

@Component({
  selector: 'cb-question-creator',
  templateUrl: './question-creator.component.html',
  styleUrls: ['./question-creator.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => QuestionCreatorComponent),
    multi: true
  }]
})
export class QuestionCreatorComponent implements OnInit, ControlValueAccessor {
  @Input() questionNum: number;
  @Input() topics: Array<QuestionTopic>;
  questionForm: FormGroup;
  availableQuestionTypes: Array<QuestionType>;

  constructor(private quizService: QuizService) { }

  propagateChange = (_: any) => { };

  ngOnInit() {
    this.questionForm = new FormGroup({
      topic: new FormControl(null, Validators.required),
      typeId: new FormControl(null, Validators.required),
      questionDetails: new FormControl(null, Validators.required)
    });

    this.questionForm.controls['topic'].valueChanges.subscribe((newTopicId) => {
      this.quizService.questionTypes(newTopicId).then(({ types }) => {
        this.availableQuestionTypes = types;
      });
    });

    this.questionForm.valueChanges.subscribe((value) => {
      if (this.questionForm.valid) {
        this.propagateChange({ ...value, questionNum: this.questionNum });
      } else {
        this.propagateChange(null);
      }
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.questionForm.patchValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // Not interested in blur interaction
    return;
  }

  typesLoadedForQuestion(): boolean {
    return this.availableQuestionTypes && this.availableQuestionTypes.length > 0;
  }

  typesForQuestion(): Array<QuestionType> {
    if (this.typesLoadedForQuestion()) {
      return this.availableQuestionTypes;
    } else {
      return [];
    }
  }

  selectedTypeMachineName(): string {
    const selectedType = this.typesForQuestion().find(t => t.id === this.questionForm.controls['typeId'].value);
    return selectedType ? selectedType.machineName : '';
  }
}
