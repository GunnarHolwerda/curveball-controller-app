import { QuizzesModule } from './quizzes.module';

describe('QuizzesModule', () => {
  let quizzesModule: QuizzesModule;

  beforeEach(() => {
    quizzesModule = new QuizzesModule();
  });

  it('should create an instance', () => {
    expect(quizzesModule).toBeTruthy();
  });
});
