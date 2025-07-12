import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { TextInputModule } from 'src/app/general/ui/text-input/text-input.module';
import { PasswordModule } from '../ui/password/password.module';
import { AltAuthModule } from '../ui/alt-auth/alt-auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/general/ui/button/button.module';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    TextInputModule,
    PasswordModule,
    AltAuthModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
