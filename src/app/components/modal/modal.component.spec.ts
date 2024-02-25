import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalComponent } from './modal.component';

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
