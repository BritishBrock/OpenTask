import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardViewerComponent } from './board-viewer.component';

describe('BoardViewerComponent', () => {
  let component: BoardViewerComponent;
  let fixture: ComponentFixture<BoardViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
