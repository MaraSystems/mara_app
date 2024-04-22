import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttatchmentUploadComponent } from './attatchment-upload.component';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { FileInputModule } from 'src/app/shared/ui/file-input/file-input.module';
import { TextAreaModule } from 'src/app/shared/ui/text-area/text-area.module';



@NgModule({
  declarations: [
    AttatchmentUploadComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FileInputModule,
    TextAreaModule
  ],
  exports: [
    AttatchmentUploadComponent,
    InputModule,
    FileInputModule
  ]
})
export class AttatchmentUploadModule { }
