import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuizSettingsModalComponent } from '../quiz-settings-modal/quiz-settings-modal.component';
import { FullQuizResponse, IQuizResponse } from 'src/app/models/quizzes';
import { IUser } from 'src/app/models/user';
import { QuizService } from 'src/app/services/quiz.service';
import { RealtimeService } from 'src/app/services/realtime.service';
import { CurrentQuizzes } from 'src/app/services/current-quizzes.service';
import { Env } from 'src/app/services/environment.service';
import { TestToolsService } from 'src/app/services/test-tools.service';
import { IQuestionResponse, IChoiceResponse } from 'src/app/models/question';

@Component({
  selector: 'cb-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  originalQuiz: FullQuizResponse;
  quiz: FullQuizResponse;
  quizRoom: string;
  alivePlayers: Array<IUser> = [];
  allSent = false;
  deletingQuizRoom = false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private realTime: RealtimeService,
    private currentQuizzes: CurrentQuizzes,
    private env: Env,
    public dialog: MatDialog,
    private testTools: TestToolsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      this.quiz = (await this.quizService.getQuiz(params.quizId)).quiz;
      this.allSent = this.allQuestionsAreSent();
      this.originalQuiz = { ...this.quiz };
      try {
        this.quizRoom = (await this.realTime.getQuizRoom(this.quiz.quizId)).quizId;
      } catch {
        this.quizRoom = undefined;
      }
    });
  }

  canStart(): boolean {
    return !this.quiz.completedDate && this.quizRoom !== undefined;
  }

  hasQuizRoom(): boolean {
    return this.quizRoom !== undefined;
  }

  canResetQuiz(): boolean {
    return !this.env.production;
  }

  allQuestionsAreSent(): boolean {
    const result = this.quiz.questions.reduce((carry, q) => {
      if (!q.sent) {
        return false && carry;
      }
      return carry;
    }, true);
    return result;
  }

  bannerMessage(): string {
    if (this.quiz.deleted) {
      return 'This quiz has been deleted';
    }
    return '';
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(QuizSettingsModalComponent, {
      width: '250px',
      data: { quiz: this.quiz }
    });
    dialogRef.afterClosed().subscribe((quiz) => {
      if (quiz) {
        this.replaceQuiz(quiz);
      }
    });
  }

  async onSendWinners(): Promise<void> {
    const { users, amountWon } = await this.quizService.completeQuiz(this.quiz.quizId);
    this.updateQuiz({ completedDate: (new Date().toISOString()), active: false });
    this.realTime.emitWinners(this.quiz.quizId, users, amountWon);
  }

  async onUpdate(): Promise<void> {
    const updatedQuiz = { ...this.quiz };
    delete updatedQuiz.questions;
    this.updateQuiz({ ...(updatedQuiz as IQuizResponse) });
  }

  async onCreateQuizRoom(): Promise<void> {
    await this.updateQuiz({ active: true });
    await this.realTime.createQuizRoom(this.quiz);
    this.quizRoom = this.quiz.quizId;
  }

  async onDeleteQuizRoom(): Promise<void> {
    this.deletingQuizRoom = true;
    if (!this.quiz.completedDate && this.allQuestionsAreSent()) {
      await this.quizService.completeQuiz(this.quiz.quizId);
      this.updateQuiz({ completedDate: (new Date().toISOString()), active: false });
    }
    await this.realTime.emitComplete(this.quiz.quizId);
    setTimeout(async () => {
      await this.realTime.deleteQuizRoom(this.quiz.quizId);
      this.currentQuizzes.removeQuiz(this.quiz.quizId);
      this.quizRoom = undefined;
      this.deletingQuizRoom = false;
    }, 3000);
  }

  async onStart(): Promise<void> {
    const response = await this.quizService.startQuiz(this.quiz.quizId);
    await this.realTime.emitQuestion(response.firstQuestion, response.token);
    this.replaceQuiz(response.quiz, [response.firstQuestion]);
  }

  async onQuestionStart(question: IQuestionResponse): Promise<void> {
    const startedQuestion = (await this.quizService.startQuestion(this.quiz.quizId, question.questionId)).question;
    this.realTime.emitQuestion(startedQuestion);
    this.replaceQuestion(startedQuestion);
    this.allSent = this.allQuestionsAreSent();
  }

  async resetQuiz(): Promise<void> {
    const resetQuiz = await this.quizService.resetQuiz(this.quiz.quizId);
    this.replaceQuiz(resetQuiz.quiz, resetQuiz.quiz.questions);
  }

  async onCalculateResults(question: IQuestionResponse): Promise<void> {
    const results = await this.quizService.calculateResults(this.quiz.quizId, question.questionId);
    this.realTime.emitResults(this.quiz.quizId, results);
    this.quizService.getParticipants(this.quiz.quizId).then(result => this.alivePlayers = result.users);
  }

  async markAsAnswer(choice: IChoiceResponse): Promise<void> {
    const response = await this.quizService.updateChoice(this.quiz.quizId, choice.questionId, choice.choiceId, { isAnswer: true });
    const questionIndex = this.quiz.questions.findIndex(q => q.questionId == choice.questionId);
    const choiceIndex = this.quiz.questions[questionIndex].choices.findIndex(c => c.choiceId === choice.choiceId);
    this.quiz.questions[questionIndex].choices[choiceIndex] = response;
  }

  async onGenerateRandomAnswers(event: { questionId: string, numAnswers: number }): Promise<void> {
    try {
      await this.testTools.generateRandomAnswersForQuestion(event.questionId, event);
    } catch (e) {
      console.error(e);
    }
  }

  private async updateQuiz(quizProperties: Partial<IQuizResponse>): Promise<void> {
    const updatedQuiz = (await this.quizService.updateQuiz(this.quiz.quizId, quizProperties)).quiz;
    this.replaceQuiz(updatedQuiz);
  }

  private replaceQuiz(newQuizData: IQuizResponse, questions?: Array<IQuestionResponse>): void {
    if (questions) {
      questions.forEach(q => this.replaceQuestion(q));
    }
    this.quiz = {
      ...newQuizData,
      questions: this.quiz.questions
    };
    this.originalQuiz = { ...this.quiz };
  }

  private replaceQuestion(question: IQuestionResponse): void {
    const indexOfOriginalQuestion = this.quiz.questions.findIndex(q => q.questionId === question.questionId);
    this.quiz.questions[indexOfOriginalQuestion] = question;
  }

}
