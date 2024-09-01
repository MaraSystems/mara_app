import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionReviewComponent } from './revision-review.component';

describe('RevisionReviewComponent', () => {
  let component: RevisionReviewComponent;
  let fixture: ComponentFixture<RevisionReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionReviewComponent]
    });
    fixture = TestBed.createComponent(RevisionReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
