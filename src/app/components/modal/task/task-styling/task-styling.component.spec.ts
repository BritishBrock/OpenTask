import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStylingComponent } from './task-styling.component';

describe('TaskStylingComponent', () => {
  let component: TaskStylingComponent;
  let fixture: ComponentFixture<TaskStylingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskStylingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskStylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
