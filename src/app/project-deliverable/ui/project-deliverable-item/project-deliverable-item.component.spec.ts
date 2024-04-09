import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliverableItemComponent } from './project-deliverable-item.component';

describe('ProjectDeliverableItemComponent', () => {
  let component: ProjectDeliverableItemComponent;
  let fixture: ComponentFixture<ProjectDeliverableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDeliverableItemComponent]
    });
    fixture = TestBed.createComponent(ProjectDeliverableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
