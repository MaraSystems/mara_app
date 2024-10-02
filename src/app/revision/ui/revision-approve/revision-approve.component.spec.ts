import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionApproveComponent } from './revision-approve.component';

describe('RevisionApproveComponent', () => {
  let component: RevisionApproveComponent;
  let fixture: ComponentFixture<RevisionApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionApproveComponent]
    });
    fixture = TestBed.createComponent(RevisionApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
