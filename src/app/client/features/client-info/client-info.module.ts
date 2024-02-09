import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientInfoComponent } from './client-info.component';
import { ClientInfoRoutingModule } from './client-info-routing.module';
import { KeyvalueModule } from 'src/app/shared/ui/keyvalue/keyvalue.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientInfoComponent
  ],
  imports: [
    CommonModule,
    ClientInfoRoutingModule,
    KeyvalueModule,
    ReactiveFormsModule
  ]
})
export class ClientInfoModule { }
