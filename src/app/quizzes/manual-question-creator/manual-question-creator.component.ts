import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cb-manual-question-creator',
  templateUrl: './manual-question-creator.component.html',
  styleUrls: ['./manual-question-creator.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ManualQuestionCreatorComponent),
    multi: true
  }]
})
export class ManualQuestionCreatorComponent implements OnInit, ControlValueAccessor {
  detailsForm: FormGroup;
  propagateChange = (_: any) => { };

  constructor() { }

  ngOnInit() {
    this.detailsForm = new FormGroup({
      question: new FormControl(null, [Validators.required, Validators.maxLength(64)]),
      ticker: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      choices: new FormArray([this.createChoice()])
    });

    this.detailsForm.valueChanges.subscribe((value) => {
      if (this.detailsForm.valid) {
        this.propagateChange(value);
      } else {
        this.propagateChange(null);
      }
    });
  }

  createChoice(): FormGroup {
    return new FormGroup({
      text: new FormControl('', [Validators.required, Validators.maxLength(64)]),
      isAnswer: new FormControl(false)
    });
  }

  // TODO: Prevent more than 4 choices
  addChoice(): void {
    const choices = this.detailsForm.get('choices') as FormArray;
    choices.push(this.createChoice());
  }

  removeChoice(choice: number): void {
    const choices = this.detailsForm.get('choices') as FormArray;
    choices.removeAt(choice);
  }

  writeValue(value: any): void {
    if (value) {
      this.detailsForm.patchValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // Ignore interaction like hovering
    return;
  }

}
