import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualQuestionCreatorComponent } from './manual-question-creator.component';

describe('ManualQuestionCreatorComponent', () => {
  let component: ManualQuestionCreatorComponent;
  let fixture: ComponentFixture<ManualQuestionCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualQuestionCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualQuestionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
