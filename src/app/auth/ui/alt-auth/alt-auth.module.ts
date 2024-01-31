import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'src/app/shared/ui/button/button.module';
import { AltAuthComponent } from './alt-auth.component';



@NgModule({
  declarations: [
    AltAuthComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    AltAuthComponent
  ]
})
export class AltAuthModule { }
