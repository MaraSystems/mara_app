import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliverableListComponent } from './project-deliverable-list.component';

describe('ProjectDeliverableListComponent', () => {
  let component: ProjectDeliverableListComponent;
  let fixture: ComponentFixture<ProjectDeliverableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDeliverableListComponent]
    });
    fixture = TestBed.createComponent(ProjectDeliverableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
