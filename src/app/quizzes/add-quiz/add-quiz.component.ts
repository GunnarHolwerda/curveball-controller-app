import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionTopic } from 'src/app/models/question-topics-response';
import { QuestionType } from 'src/app/models/question-types-response';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'cb-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  topics: Array<QuestionTopic> = [];
  questionTypes: { [questionNum: number]: Array<QuestionType> } = {};
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

  createQuestion(): FormControl {
    const questionGroup = new FormControl(null, Validators.required);
    return questionGroup;
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  async onSubmit(): Promise<void> {
    const { potAmount, title, auth, questions } = this.createQuizForm.value;
    const { quiz } = await this.quizService.createQuiz({ potAmount, title, auth });
    await this.quizService.addQuestions(quiz.quizId, { questions });
    this.router.navigate(['/quizzes', quiz.quizId]);
  }

  enforcesCorrectAnswers(): boolean {
    return this.createQuizForm.controls['auth'].value as boolean;
  }
}
