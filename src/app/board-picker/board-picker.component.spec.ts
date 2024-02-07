import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPickerComponent } from './board-picker.component';

describe('BoardPickerComponent', () => {
  let component: BoardPickerComponent;
  let fixture: ComponentFixture<BoardPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
