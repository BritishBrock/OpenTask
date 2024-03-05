import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultMenuSelectorComponent } from './default-menu-selector.component';

describe('DefaultMenuSelectorComponent', () => {
  let component: DefaultMenuSelectorComponent;
  let fixture: ComponentFixture<DefaultMenuSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultMenuSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultMenuSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
