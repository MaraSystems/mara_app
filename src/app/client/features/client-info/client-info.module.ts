import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientInfoComponent } from './client-info.component';
import { ClientInfoRoutingModule } from './client-info-routing.module';
import { KeyvalueModule } from 'src/app/shared/ui/keyvalue/keyvalue.module';


@NgModule({
  declarations: [
    ClientInfoComponent
  ],
  imports: [
    CommonModule,
    ClientInfoRoutingModule,
    KeyvalueModule
  ]
})
export class ClientInfoModule { }
