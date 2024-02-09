import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyvalueComponent } from './keyvalue.component';
import { InputModule } from '../input/input.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    KeyvalueComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    FormsModule
  ],
  exports: [
    KeyvalueComponent
  ]
})
export class KeyvalueModule { }
