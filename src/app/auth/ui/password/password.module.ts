import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { FormsModule } from '@angular/forms';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { ButtonModule } from 'src/app/general/ui/button/button.module';
import { FormErrorsModule } from 'src/app/general/ui/form-errors/form-errors.module';


@NgModule({
  declarations: [
    PasswordComponent,
  ],
  imports: [
    CommonModule,
    InputModule,
    ButtonModule,
    FormErrorsModule
  ],
  exports: [
    PasswordComponent
  ]
})
export class PasswordModule { }
