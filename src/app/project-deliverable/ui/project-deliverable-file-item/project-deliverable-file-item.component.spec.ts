import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliverableFileItemComponent } from './project-deliverable-file-item.component';

describe('ProjectDeliverableFileItemComponent', () => {
  let component: ProjectDeliverableFileItemComponent;
  let fixture: ComponentFixture<ProjectDeliverableFileItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDeliverableFileItemComponent]
    });
    fixture = TestBed.createComponent(ProjectDeliverableFileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
