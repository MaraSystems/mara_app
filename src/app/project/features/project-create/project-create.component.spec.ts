import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateComponent } from './project-create.component';
import { Store, StoreModule } from '@ngrx/store';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProjectCreateComponent', () => {
  let component: ProjectCreateComponent;
  let fixture: ComponentFixture<ProjectCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectCreateComponent,
        InputComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
