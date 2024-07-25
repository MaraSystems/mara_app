import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignatureComponent } from './signature.component';
import { SelectModule } from '../../ui/select/select.module';



@NgModule({
  declarations: [
    SignatureComponent
  ],
  imports: [
    CommonModule,
    SelectModule
  ],
  exports: [
    SignatureComponent
  ]
})
export class SignatureModule { }
