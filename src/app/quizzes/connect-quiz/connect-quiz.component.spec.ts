import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectQuizComponent } from './connect-quiz.component';

describe('TestQuizComponent', () => {
  let component: ConnectQuizComponent;
  let fixture: ComponentFixture<ConnectQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectQuizComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
