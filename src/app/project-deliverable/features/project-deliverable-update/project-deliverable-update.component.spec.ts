import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliverableUpdateComponent } from './project-deliverable-update.component';

describe('ProjectDeliverableUpdateComponent', () => {
  let component: ProjectDeliverableUpdateComponent;
  let fixture: ComponentFixture<ProjectDeliverableUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDeliverableUpdateComponent]
    });
    fixture = TestBed.createComponent(ProjectDeliverableUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
