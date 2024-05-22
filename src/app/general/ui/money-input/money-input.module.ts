import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyInputComponent } from './money-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../utils/directives/directives.module';
import { FormErrorsModule } from '../form-errors/form-errors.module';


@NgModule({
  declarations: [
    MoneyInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    FormErrorsModule
  ],
  exports: [
    MoneyInputComponent,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class MoneyInputModule { }
