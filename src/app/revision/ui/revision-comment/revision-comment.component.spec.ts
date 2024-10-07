import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionCommentComponent } from './revision-comment.component';

describe('RevisionCommentComponent', () => {
  let component: RevisionCommentComponent;
  let fixture: ComponentFixture<RevisionCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionCommentComponent]
    });
    fixture = TestBed.createComponent(RevisionCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
