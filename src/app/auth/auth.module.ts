import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { ExternalAuthenticationComponent } from './external-authentication/external-authentication.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    OtpComponent,
    ExternalAuthenticationComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ],
  exports: [
    OtpComponent,
    ExternalAuthenticationComponent
  ]
})
export class AuthModule { }
