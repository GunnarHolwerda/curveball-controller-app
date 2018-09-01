import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import { Topics } from '../models/topics';

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
      question: new FormControl(null, Validators.required),
      questionNum: new FormControl(questionNum, Validators.required),
      sport: new FormControl(this.topics[0].value, Validators.required),
      ticker: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      choices: new FormArray([this.createChoice(), this.createChoice(), this.createChoice()])
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion(this.questions.length + 1));
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

  get topics(): Array<{ value: string, label: string }> {
    return Topics;
  }

  async onSubmit(): Promise<void> {
    const { potAmount, title, questions } = this.createQuizForm.value;
    const { quiz } = await this.quizService.createQuiz({ potAmount, title });
    await this.quizService.addQuestions(quiz.quizId, { questions });
    this.router.navigate(['/quizzes', quiz.quizId]);
  }
}
