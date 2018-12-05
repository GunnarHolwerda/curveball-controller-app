import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSettingsModalComponent } from './quiz-settings-modal.component';

describe('QuizSettingsModalComponent', () => {
  let component: QuizSettingsModalComponent;
  let fixture: ComponentFixture<QuizSettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizSettingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
