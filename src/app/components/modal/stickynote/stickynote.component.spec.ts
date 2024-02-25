import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickynoteComponent } from './stickynote.component';

describe('StickynoteComponent', () => {
  let component: StickynoteComponent;
  let fixture: ComponentFixture<StickynoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickynoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StickynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
