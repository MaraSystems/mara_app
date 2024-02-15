import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KinComponent } from './kin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyvalueModule } from 'src/app/shared/ui/keyvalue/keyvalue.module';
import { KinRoutingModule } from './kin-routing.module';



@NgModule({
  declarations: [
    KinComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KeyvalueModule,
    KinRoutingModule
  ]
})
export class KinModule { }
