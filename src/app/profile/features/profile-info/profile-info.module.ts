import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import { KeyvalueModule } from 'src/app/shared/ui/keyvalue/keyvalue.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileInfoRoutingModule } from './profile-info-routing.module';


@NgModule({
  declarations: [
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    KeyvalueModule,
    ReactiveFormsModule,
    ProfileInfoRoutingModule
  ]
})
export class ProfileInfoModule { }
