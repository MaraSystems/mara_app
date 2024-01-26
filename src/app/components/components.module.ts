import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { SwitcherComponent } from './switcher/switcher.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { FormComponent } from './form/form.component';
import { NotfoundComponent } from './notfound/notfound.component';



@NgModule({
  declarations: [
    ButtonComponent,
    SwitcherComponent,
    IconComponent,
    InputComponent,
    FormComponent,
    NotfoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    SwitcherComponent,
    IconComponent
  ]
})
export class ComponentsModule { }
