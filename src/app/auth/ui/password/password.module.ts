import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { FormsModule } from '@angular/forms';
import { InputModule } from 'src/app/general/ui/input/input.module';


@NgModule({
  declarations: [
    PasswordComponent,
  ],
  imports: [
    CommonModule,
    InputModule
  ],
  exports: [
    PasswordComponent
  ]
})
export class PasswordModule { }
