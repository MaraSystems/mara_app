import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDeliverableCreateComponent } from './project-deliverable-create.component';
import { ProjectDeliverableCreateRoutingModule } from './project-deliverable-create-routing.module';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { FileInputModule } from 'src/app/shared/ui/file-input/file-input.module';
import { TextAreaModule } from 'src/app/shared/ui/text-area/text-area.module';



@NgModule({
  declarations: [
    ProjectDeliverableCreateComponent
  ],
  imports: [
    CommonModule,
    ProjectDeliverableCreateRoutingModule,
    InputModule,
    FileInputModule,
    TextAreaModule
  ],
  exports: [
    ProjectDeliverableCreateComponent
  ]
})
export class ProjectDeliverableCreateModule { }
