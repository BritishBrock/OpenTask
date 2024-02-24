import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeybindsComponent } from './keybinds.component';

describe('KeybindsComponent', () => {
  let component: KeybindsComponent;
  let fixture: ComponentFixture<KeybindsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KeybindsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KeybindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
