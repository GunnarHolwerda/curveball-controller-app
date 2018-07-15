import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToQuizComponent } from './connect-to-quiz.component';

describe('ConnectToQuizComponent', () => {
  let component: ConnectToQuizComponent;
  let fixture: ComponentFixture<ConnectToQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectToQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectToQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
