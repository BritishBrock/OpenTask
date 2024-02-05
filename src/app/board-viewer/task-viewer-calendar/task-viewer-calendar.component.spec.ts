import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewerCalendarComponent } from './task-viewer-calendar.component';

describe('TaskViewerCalendarComponent', () => {
  let component: TaskViewerCalendarComponent;
  let fixture: ComponentFixture<TaskViewerCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskViewerCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskViewerCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
