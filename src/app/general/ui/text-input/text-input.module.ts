import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../utils/directives/directives.module';
import { FormErrorsModule } from '../form-errors/form-errors.module';


@NgModule({
  declarations: [
    TextInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    FormErrorsModule
  ],
  exports: [
    TextInputComponent,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class TextInputModule { }
