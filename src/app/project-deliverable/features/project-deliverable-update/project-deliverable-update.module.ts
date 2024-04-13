import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDeliverableUpdateComponent } from './project-deliverable-update.component';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { TextAreaModule } from 'src/app/shared/ui/text-area/text-area.module';
import { FileInputModule } from 'src/app/shared/ui/file-input/file-input.module';



@NgModule({
  declarations: [
    ProjectDeliverableUpdateComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    TextAreaModule,
    FileInputModule
  ],
  exports: [
    ProjectDeliverableUpdateComponent
  ]
})
export class ProjectDeliverableUpdateModule { }
