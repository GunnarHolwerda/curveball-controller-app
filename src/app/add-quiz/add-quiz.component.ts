import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cb-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  createQuizForm: FormGroup;
  questions: FormArray;
  questionChoices: { [questionNum: number]: FormArray } = {};

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.createQuizForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      potAmount: new FormControl(0, Validators.required),
      questions: new FormArray([this.createQuestion()])
    });
    this.questions = this.createQuizForm.get('questions') as FormArray;
  }

  createQuestion(questionNum = 1): FormGroup {
    return new FormGroup({
      question: new FormControl('', Validators.required),
      questionNum: new FormControl(questionNum, Validators.required),
      choices: new FormArray([this.createChoice()])
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion(this.questions.length + 1));
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
    for (index + 1; index < this.questions.length; index++) {
      const control = this.questions.at(index);
      control.patchValue({
        questionNum: control.get('questionNum').value - 1,
      });
    }
  }

  createChoice(): FormGroup {
    return new FormGroup({
      text: new FormControl('', Validators.required),
      isAnswer: new FormControl(false)
    });
  }

  addChoice(question = 0): void {
    const questions = this.createQuizForm.get('questions') as FormArray;
    const choices = questions.at(question).get('choices') as FormArray;
    choices.push(this.createChoice());
  }

  removeChoice(question: number, choice: number): void {
    const questions = this.createQuizForm.get('questions') as FormArray;
    const choices = questions.at(question).get('choices') as FormArray;
    choices.removeAt(choice);
  }

  async onSubmit(): Promise<void> {
    const { quiz } = await this.quizService.createQuiz(this.createQuizForm.value);
    this.router.navigate(['/quizzes', quiz.quizId]);
  }
}
