import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDateComponent } from './task-date.component';

describe('TaskDateComponent', () => {
  let component: TaskDateComponent;
  let fixture: ComponentFixture<TaskDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
