import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectUpdateComponent } from './project-update.component';
import { SelectModule } from 'src/app/shared/ui/select/select.module';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { FileInputModule } from 'src/app/shared/ui/file-input/file-input.module';
import { TextAreaModule } from 'src/app/shared/ui/text-area/text-area.module';



@NgModule({
  declarations: [
    ProjectUpdateComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    InputModule,
    FileInputModule,
    TextAreaModule
  ],
  exports: [
    ProjectUpdateComponent
  ]
})
export class ProjectUpdateModule { }
