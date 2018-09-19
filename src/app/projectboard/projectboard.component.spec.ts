import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectboardComponent } from './projectboard.component';

describe('ProjectboardComponent', () => {
  let component: ProjectboardComponent;
  let fixture: ComponentFixture<ProjectboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
