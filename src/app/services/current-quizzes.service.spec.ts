import { TestBed, inject } from '@angular/core/testing';

import { CurrentQuizzes } from './current-quizzes.service';

describe('ActiveQuizzesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentQuizzes]
    });
  });

  it('should be created', inject([CurrentQuizzes], (service: CurrentQuizzes) => {
    expect(service).toBeTruthy();
  }));
});
