import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageInputComponent } from './message-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../utils/directives/directives.module';
import { FormErrorsModule } from '../form-errors/form-errors.module';


@NgModule({
  declarations: [
    MessageInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    FormErrorsModule
  ],
  exports: [
    MessageInputComponent,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class MessageInputModule { }
