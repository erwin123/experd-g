import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecsummaryComponent } from './execsummary.component';

describe('ExecsummaryComponent', () => {
  let component: ExecsummaryComponent;
  let fixture: ComponentFixture<ExecsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
