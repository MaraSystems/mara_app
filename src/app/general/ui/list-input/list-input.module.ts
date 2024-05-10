import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInputComponent } from './list-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../utils/directives/directives.module';
import { FormErrorsModule } from '../form-errors/form-errors.module';


@NgModule({
  declarations: [
    ListInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    FormErrorsModule
  ],
  exports: [
    ListInputComponent,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class ListInputModule { }
