import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepboardComponent } from './stepboard.component';

describe('StepboardComponent', () => {
  let component: StepboardComponent;
  let fixture: ComponentFixture<StepboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
