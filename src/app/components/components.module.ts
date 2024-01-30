import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { SwitcherComponent } from './switcher/switcher.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RouterModule } from '@angular/router';
import { InputComponent } from './input/input.component';


@NgModule({
  declarations: [
    ButtonComponent,
    SwitcherComponent,
    NotfoundComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    SwitcherComponent,
    InputComponent,
  ]
})
export class ComponentsModule { }
