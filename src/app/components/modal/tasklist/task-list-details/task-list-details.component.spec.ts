import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListDetailsComponent } from './task-list-details.component';

describe('TaskListDetailsComponent', () => {
  let component: TaskListDetailsComponent;
  let fixture: ComponentFixture<TaskListDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
