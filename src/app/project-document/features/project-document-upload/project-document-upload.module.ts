import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDocumentUploadComponent } from './project-document-upload.component';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { FileInputModule } from 'src/app/shared/ui/file-input/file-input.module';
import { TextAreaModule } from 'src/app/shared/ui/text-area/text-area.module';



@NgModule({
  declarations: [
    ProjectDocumentUploadComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FileInputModule,
    TextAreaModule
  ],
  exports: [
    ProjectDocumentUploadComponent,
    InputModule,
    FileInputModule
  ]
})
export class ProjectDocumentUploadModule { }
