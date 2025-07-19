import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create.component';
import { TextInputModule } from 'src/app/general/ui/text-input/text-input.module';
import { UserCreateRoutingModule } from './user-create-routing.module';
import { AltAuthModule } from 'src/app/auth/ui/alt-auth/alt-auth.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    TextInputModule,
    AltAuthModule,
    UserCreateRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    UserCreateComponent
  ]
})
export class UserCreateModule { }
