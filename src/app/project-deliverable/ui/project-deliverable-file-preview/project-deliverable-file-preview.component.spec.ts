import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliverableFilePreviewComponent } from './project-deliverable-file-preview.component';

describe('ProjectDeliverableFilePreviewComponent', () => {
  let component: ProjectDeliverableFilePreviewComponent;
  let fixture: ComponentFixture<ProjectDeliverableFilePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDeliverableFilePreviewComponent]
    });
    fixture = TestBed.createComponent(ProjectDeliverableFilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
