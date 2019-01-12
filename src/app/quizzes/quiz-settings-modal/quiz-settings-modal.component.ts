import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IQuizResponse } from 'src/app/models/quizzes';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'cb-quiz-settings-modal',
  templateUrl: './quiz-settings-modal.component.html',
  styleUrls: ['./quiz-settings-modal.component.css']
})
export class QuizSettingsModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QuizSettingsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { quiz: IQuizResponse },
    private quizService: QuizService
  ) { }

  ngOnInit() {
  }

  async deleteQuiz(): Promise<void> {
    try {
      await this.quizService.deleteQuiz(this.data.quiz.quizId);
      this.data.quiz.deleted = true;
    } catch (e) {
      console.error('Error when deleting quiz');
    }
  }
}
