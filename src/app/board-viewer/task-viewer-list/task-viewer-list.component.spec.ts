import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewerListComponent } from './task-viewer-list.component';

describe('TaskViewerListComponent', () => {
  let component: TaskViewerListComponent;
  let fixture: ComponentFixture<TaskViewerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskViewerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskViewerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
