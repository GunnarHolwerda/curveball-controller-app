import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurveballNavComponent } from './curveball-nav.component';

describe('CurveballNavComponent', () => {
  let component: CurveballNavComponent;
  let fixture: ComponentFixture<CurveballNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurveballNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurveballNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
