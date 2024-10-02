import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionAmmendComponent } from './revision-ammend.component';

describe('RevisionAmmendComponent', () => {
  let component: RevisionAmmendComponent;
  let fixture: ComponentFixture<RevisionAmmendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionAmmendComponent]
    });
    fixture = TestBed.createComponent(RevisionAmmendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
