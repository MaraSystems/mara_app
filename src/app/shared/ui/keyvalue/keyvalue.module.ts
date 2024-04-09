import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyvalueComponent } from './keyvalue.component';
import { InputModule } from '../input/input.module';


@NgModule({
  declarations: [
    KeyvalueComponent,
  ],
  imports: [
    CommonModule,
    InputModule
  ],
  exports: [
    KeyvalueComponent
  ]
})
export class KeyvalueModule { }
