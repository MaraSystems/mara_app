import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentUploadComponent } from './attachment-upload.component';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { FileInputModule } from 'src/app/general/ui/file-input/file-input.module';
import { TextAreaModule } from 'src/app/general/ui/text-area/text-area.module';
import { ButtonModule } from 'src/app/general/ui/button/button.module';



@NgModule({
  declarations: [
    AttachmentUploadComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FileInputModule,
    TextAreaModule,
    ButtonModule
  ],
  exports: [
    AttachmentUploadComponent,
    InputModule,
    FileInputModule
  ]
})
export class AttachmentUploadModule { }
