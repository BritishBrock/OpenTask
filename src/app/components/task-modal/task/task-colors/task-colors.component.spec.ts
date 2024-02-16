import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskColorsComponent } from './task-colors.component';

describe('TaskColorsComponent', () => {
  let component: TaskColorsComponent;
  let fixture: ComponentFixture<TaskColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskColorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
