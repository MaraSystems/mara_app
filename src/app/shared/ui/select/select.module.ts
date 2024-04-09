import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { InputModule } from '../input/input.module';
import { FormErrorsModule } from '../form-errors/form-errors.module';



@NgModule({
  declarations: [
    SelectComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FormErrorsModule
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
