import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecthreeComponent } from './execthree.component';

describe('ExecthreeComponent', () => {
  let component: ExecthreeComponent;
  let fixture: ComponentFixture<ExecthreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecthreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecthreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
