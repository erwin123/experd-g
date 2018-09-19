import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachyboardComponent } from './coachyboard.component';

describe('CoachyboardComponent', () => {
  let component: CoachyboardComponent;
  let fixture: ComponentFixture<CoachyboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachyboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
