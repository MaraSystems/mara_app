import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitDirective } from './unit.directive';



@NgModule({
  declarations: [
    UnitDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UnitDirective,
  ]
})
export class DirectivesModule { }
