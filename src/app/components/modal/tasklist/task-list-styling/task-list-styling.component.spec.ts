import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListStylingComponent } from './task-list-styling.component';

describe('TaskListStylingComponent', () => {
  let component: TaskListStylingComponent;
  let fixture: ComponentFixture<TaskListStylingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListStylingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListStylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
