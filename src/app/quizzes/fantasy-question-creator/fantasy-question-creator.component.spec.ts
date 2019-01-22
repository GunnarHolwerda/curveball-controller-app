import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyQuestionCreatorComponent } from './fantasy-question-creator.component';

describe('FantasyQuestionCreatorComponent', () => {
  let component: FantasyQuestionCreatorComponent;
  let fixture: ComponentFixture<FantasyQuestionCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FantasyQuestionCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasyQuestionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
