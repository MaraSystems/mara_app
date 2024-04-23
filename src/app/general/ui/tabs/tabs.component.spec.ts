import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent]
    });
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.list = ['A', 'B', 'C'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a tab', () => {
    const emitter = spyOn(component.select, 'emit');
    component.tab(2);
    expect(component.active).toBe(2);
    expect(emitter).toHaveBeenCalled();
  });

  it('should fail when not in range', () => {
    expect(() => {
      component.tab(3)
    }).toThrow(new Error('Not in range'));
  });
});
