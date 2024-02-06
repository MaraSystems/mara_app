import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile.component';
import { RouterModule } from '@angular/router';
import { ClientProfileRoutingModule } from './client-profile-routing.module';



@NgModule({
  declarations: [
    ClientProfileComponent
  ],
  imports: [
    CommonModule,
    ClientProfileRoutingModule
  ],
  exports: [
    ClientProfileComponent,
    RouterModule
  ]
})
export class ClientProfileModule { }
