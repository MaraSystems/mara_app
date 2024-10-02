import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyvalueComponent } from './keyvalue.component';
import { InputModule } from '../input/input.module';
import { FormErrorsModule } from '../form-errors/form-errors.module';


@NgModule({
  declarations: [
    KeyvalueComponent,
  ],
  imports: [
    CommonModule,
    InputModule,
    FormErrorsModule
  ],
  exports: [
    KeyvalueComponent
  ]
})
export class KeyvalueModule { }
