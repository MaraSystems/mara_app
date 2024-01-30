import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    AuthModule
  ]
})
export class UsersModule { }
