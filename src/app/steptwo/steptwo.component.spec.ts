import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteptwoComponent } from './steptwo.component';

describe('SteptwoComponent', () => {
  let component: SteptwoComponent;
  let fixture: ComponentFixture<SteptwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteptwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteptwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
