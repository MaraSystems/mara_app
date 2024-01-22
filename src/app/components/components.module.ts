import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { SwitcherComponent } from './switcher/switcher.component';



@NgModule({
  declarations: [
    ButtonComponent,
    SwitcherComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    SwitcherComponent
  ]
})
export class ComponentsModule { }
