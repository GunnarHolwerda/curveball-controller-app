import { Injectable } from '@angular/core';
import { AllQuizzesResponse } from '../models/quizzes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private path = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  allQuizzes(): Promise<AllQuizzesResponse> {
    return this.http.get<AllQuizzesResponse>(`${this.path}/quizzes`).toPromise();
  }
}
