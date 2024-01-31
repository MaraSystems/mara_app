import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltAuthComponent } from './alt-auth.component';

describe('AltAuthComponent', () => {
  let component: AltAuthComponent;
  let fixture: ComponentFixture<AltAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltAuthComponent]
    });
    fixture = TestBed.createComponent(AltAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
