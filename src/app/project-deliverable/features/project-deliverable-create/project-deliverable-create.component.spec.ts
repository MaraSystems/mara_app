import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliverableCreateComponent } from './project-deliverable-create.component';

describe('ProjectDeliverableCreateComponent', () => {
  let component: ProjectDeliverableCreateComponent;
  let fixture: ComponentFixture<ProjectDeliverableCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDeliverableCreateComponent]
    });
    fixture = TestBed.createComponent(ProjectDeliverableCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
