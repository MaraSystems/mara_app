import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './text-area.component';
import { InputModule } from '../input/input.module';
import { FormErrorsModule } from '../form-errors/form-errors.module';



@NgModule({
  declarations: [
    TextAreaComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FormErrorsModule
  ],
  exports: [
    TextAreaComponent
  ]
})
export class TextAreaModule { }
