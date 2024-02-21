import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCreateComponent } from './project-create.component';
import { ProjectCreateRoutingModule } from './project-create-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/app/shared/ui/input/input.module';



@NgModule({
  declarations: [
    ProjectCreateComponent
  ],
  imports: [
    CommonModule,
    ProjectCreateRoutingModule,
    ReactiveFormsModule,
    InputModule
  ]
})
export class ProjectCreateModule { }
