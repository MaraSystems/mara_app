import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRegisterComponent } from './client-register.component';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { ClientRegisterRoutingModule } from './client-register-routing.module';
import { AltAuthModule } from 'src/app/auth/ui/alt-auth/alt-auth.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClientRegisterComponent
  ],
  imports: [
    CommonModule,
    InputModule,    
    AltAuthModule,
    ClientRegisterRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ClientRegisterComponent
  ]
})
export class ClientRegisterModule { }
