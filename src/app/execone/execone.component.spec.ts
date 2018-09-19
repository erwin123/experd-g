import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExeconeComponent } from './execone.component';

describe('ExeconeComponent', () => {
  let component: ExeconeComponent;
  let fixture: ComponentFixture<ExeconeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExeconeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExeconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
