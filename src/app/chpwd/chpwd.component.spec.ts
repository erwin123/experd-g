import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChpwdComponent } from './chpwd.component';

describe('ChpwdComponent', () => {
  let component: ChpwdComponent;
  let fixture: ComponentFixture<ChpwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChpwdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
