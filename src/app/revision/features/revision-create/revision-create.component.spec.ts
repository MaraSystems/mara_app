import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionCreateComponent } from './revision-create.component';

describe('RevisionCreateComponent', () => {
  let component: RevisionCreateComponent;
  let fixture: ComponentFixture<RevisionCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionCreateComponent]
    });
    fixture = TestBed.createComponent(RevisionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
