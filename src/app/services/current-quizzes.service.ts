import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ActiveQuiz } from './realtime.service';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class CurrentQuizzes {
  private _activeQuizzes: Array<ActiveQuiz> = [];
  private _currentQuizzes: BehaviorSubject<Array<ActiveQuiz>> = new BehaviorSubject([]);
  private _quizStart: Subject<ActiveQuiz> = new Subject();

  constructor() { }

  addQuiz(quiz: ActiveQuiz | Array<ActiveQuiz>): void {
    if (!Array.isArray(quiz)) {
      quiz = [quiz];
    }
    this._activeQuizzes.push(...quiz);
    this._currentQuizzes.next(this._activeQuizzes);
  }

  removeQuiz(quizId: string): void {
    this._activeQuizzes = this._activeQuizzes.filter(q => q.quizId !== quizId);
    this._currentQuizzes.next(this._activeQuizzes);
  }

  startQuiz(quiz: ActiveQuiz): void {
    this.addQuiz(quiz);
    this._quizStart.next(quiz);
  }

  get quizzes(): BehaviorSubject<Array<ActiveQuiz>> {
    return this._currentQuizzes;
  }

  get quizStart(): Subject<ActiveQuiz> {
    return this._quizStart;
  }
}
