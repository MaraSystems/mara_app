import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliverableViewComponent } from './project-deliverable-view.component';

describe('ProjectDeliverableViewComponent', () => {
  let component: ProjectDeliverableViewComponent;
  let fixture: ComponentFixture<ProjectDeliverableViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDeliverableViewComponent]
    });
    fixture = TestBed.createComponent(ProjectDeliverableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
