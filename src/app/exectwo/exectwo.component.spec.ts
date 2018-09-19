import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExectwoComponent } from './exectwo.component';

describe('ExectwoComponent', () => {
  let component: ExectwoComponent;
  let fixture: ComponentFixture<ExectwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExectwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExectwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
