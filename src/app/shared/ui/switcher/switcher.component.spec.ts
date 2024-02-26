import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherComponent } from './switcher.component';

describe('SwitcherComponent', () => {
  let component: SwitcherComponent;
  let fixture: ComponentFixture<SwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwitcherComponent]
    });
    fixture = TestBed.createComponent(SwitcherComponent);
    component = fixture.componentInstance;
    component.totalItems = 3;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to 2', () => {
    const selectSpy = spyOn(component.select, 'emit');
    component.switch(2);
    expect(selectSpy).toHaveBeenCalled();
    expect(component.active).toBe(2);
  });

  it('should fail when not in range', () => {
    expect(() => {
      component.switch(3)
    }).toThrow(new Error('Not in range'));
  });
});
