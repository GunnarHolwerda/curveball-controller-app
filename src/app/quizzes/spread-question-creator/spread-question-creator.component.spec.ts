import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadQuestionCreatorComponent } from './spread-question-creator.component';

describe('SpreadQuestionCreatorComponent', () => {
  let component: SpreadQuestionCreatorComponent;
  let fixture: ComponentFixture<SpreadQuestionCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadQuestionCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadQuestionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
