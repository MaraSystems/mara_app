import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionViewComponent } from './revision-view.component';

describe('RevisionViewComponent', () => {
  let component: RevisionViewComponent;
  let fixture: ComponentFixture<RevisionViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionViewComponent]
    });
    fixture = TestBed.createComponent(RevisionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
