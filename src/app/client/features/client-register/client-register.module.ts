import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'src/app/shared/ui/button/button.module';
import { ClientRegisterComponent } from './client-register.component';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { ClientRegisterRoutingModule } from './client-register-routing.module';
import { AltAuthModule } from 'src/app/auth/ui/alt-auth/alt-auth.module';



@NgModule({
  declarations: [
    ClientRegisterComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputModule,    
    AltAuthModule,
    ClientRegisterRoutingModule,
  ],
  exports: [
    ClientRegisterComponent
  ]
})
export class ClientRegisterModule { }
