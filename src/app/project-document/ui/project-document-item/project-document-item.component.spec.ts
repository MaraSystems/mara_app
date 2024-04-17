import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDeliverableDocumentItemComponent } from './project-deliverable-document-item.component';

describe('ProjectDeliverableDocumentItemComponent', () => {
  let component: ProjectDeliverableDocumentItemComponent;
  let fixture: ComponentFixture<ProjectDeliverableDocumentItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDeliverableDocumentItemComponent]
    });
    fixture = TestBed.createComponent(ProjectDeliverableDocumentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
