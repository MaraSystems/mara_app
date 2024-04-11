import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliverableFilesComponent } from './project-deliverable-files.component';

describe('ProjectDeliverableFilesComponent', () => {
  let component: ProjectDeliverableFilesComponent;
  let fixture: ComponentFixture<ProjectDeliverableFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDeliverableFilesComponent]
    });
    fixture = TestBed.createComponent(ProjectDeliverableFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
