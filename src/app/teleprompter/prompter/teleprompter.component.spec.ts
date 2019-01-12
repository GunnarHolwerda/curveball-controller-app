import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleprompterComponent } from './teleprompter.component';

describe('TeleprompterComponent', () => {
  let component: TeleprompterComponent;
  let fixture: ComponentFixture<TeleprompterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleprompterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleprompterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
