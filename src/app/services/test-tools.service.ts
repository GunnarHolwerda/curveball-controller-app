import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestToolsService {

  constructor(private http: HttpClient) { }

  generateRandomAnswersForQuestion(questionId: string, event: { numAnswers: number }): Promise<void> {
    const params = { ...event, questionId };
    return this.http.post<void>(`http://localhost:3001/test/answers:generate`, params).toPromise();
  }
}
