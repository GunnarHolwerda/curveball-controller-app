import { TeleprompterModule } from './teleprompter.module';

describe('TeleprompterModule', () => {
  let teleprompterModule: TeleprompterModule;

  beforeEach(() => {
    teleprompterModule = new TeleprompterModule();
  });

  it('should create an instance', () => {
    expect(teleprompterModule).toBeTruthy();
  });
});
