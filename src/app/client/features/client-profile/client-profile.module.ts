import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientProfileComponent } from './client-profile.component';
import { RouterModule } from '@angular/router';
import { ClientProfileRoutingModule } from './client-profile-routing.module';
import { TabsModule } from 'src/app/shared/ui/tabs/tabs.module';



@NgModule({
  declarations: [
    ClientProfileComponent
  ],
  imports: [
    CommonModule,
    ClientProfileRoutingModule,
    TabsModule
  ],
  bootstrap: [
    ClientProfileComponent
  ]
})
export class ClientProfileModule { }
