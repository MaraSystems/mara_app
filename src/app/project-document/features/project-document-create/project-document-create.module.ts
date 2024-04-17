import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDocumentCreateComponent } from './project-document-create.component';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { FileInputModule } from 'src/app/shared/ui/file-input/file-input.module';
import { TextAreaModule } from 'src/app/shared/ui/text-area/text-area.module';



@NgModule({
  declarations: [
    ProjectDocumentCreateComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FileInputModule,
    TextAreaModule
  ],
  exports: [
    ProjectDocumentCreateComponent,
    InputModule,
    FileInputModule
  ]
})
export class ProjectDocumentCreateModule { }
