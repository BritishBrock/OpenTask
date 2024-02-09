import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleViewerComponent } from './simple-viewer.component';

describe('SimpleViewerComponent', () => {
  let component: SimpleViewerComponent;
  let fixture: ComponentFixture<SimpleViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
