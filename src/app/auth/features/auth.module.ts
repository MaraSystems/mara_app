import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from '../ui/password/password.component';
import { AltAuthComponent } from '../ui/alt-auth/alt-auth.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { PasswordModule } from '../ui/password/password.module';
import { AltAuthModule } from '../ui/alt-auth/alt-auth.module';



@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    InputModule,
    PasswordModule,
    AltAuthModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
