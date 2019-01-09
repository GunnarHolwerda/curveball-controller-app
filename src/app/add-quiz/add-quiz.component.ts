import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import { QuestionTopic } from '../models/question-topics-response';

@Component({
  selector: 'cb-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  topics: Array<QuestionTopic> = [];
  createQuizForm: FormGroup;
  questions: FormArray;
  questionChoices: { [questionNum: number]: FormArray } = {};

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.quizService.questionTopics().then(({ topics }) => {
      this.topics = topics;
    });
    this.createQuizForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      potAmount: new FormControl(0, Validators.required),
      auth: new FormControl(false, Validators.required),
      questions: new FormArray([this.createQuestion()])
    });
    this.questions = this.createQuizForm.get('questions') as FormArray;
  }

  createQuestion(questionNum = 1): FormGroup {
    return new FormGroup({
      question: new FormControl(null, [Validators.required, Validators.maxLength(64)]),
      questionNum: new FormControl(questionNum, Validators.required),
      topic: new FormControl(null, Validators.required),
      ticker: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      choices: new FormArray([this.createChoice()])
    });
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion(this.questions.length + 1));
  }

  createChoice(): FormGroup {
    return new FormGroup({
      text: new FormControl('', [Validators.required, Validators.maxLength(64)]),
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
    const { potAmount, title, auth, questions } = this.createQuizForm.value;
    const { quiz } = await this.quizService.createQuiz({ potAmount, title, auth });
    await this.quizService.addQuestions(quiz.quizId, { questions });
    this.router.navigate(['/quizzes', quiz.quizId]);
  }
}
