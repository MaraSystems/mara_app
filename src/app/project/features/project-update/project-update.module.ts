import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectUpdateComponent } from './project-update.component';
import { SelectModule } from 'src/app/general/ui/select/select.module';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { FileInputModule } from 'src/app/general/ui/file-input/file-input.module';
import { TextAreaModule } from 'src/app/general/ui/text-area/text-area.module';



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
