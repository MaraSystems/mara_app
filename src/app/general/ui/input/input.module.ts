import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitDirective } from '../../utils/directives/unit.directive';
import { DirectivesModule } from '../../utils/directives/directives.module';
import { FormErrorsModule } from '../form-errors/form-errors.module';


@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    FormErrorsModule
  ],
  exports: [
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})
export class InputModule { }
