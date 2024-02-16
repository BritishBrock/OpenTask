import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListLinksComponent } from './task-list-links.component';

describe('TaskListLinksComponent', () => {
  let component: TaskListLinksComponent;
  let fixture: ComponentFixture<TaskListLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListLinksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskListLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
