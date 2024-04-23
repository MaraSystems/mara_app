import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from './file-input.component';
import { InputModule } from '../input/input.module';
import { FormErrorsModule } from '../form-errors/form-errors.module';



@NgModule({
  declarations: [
    FileInputComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FormErrorsModule
  ],
  exports: [
    FileInputComponent
  ]
})
export class FileInputModule { }
