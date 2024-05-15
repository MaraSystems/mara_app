import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileInfoRoutingModule } from './profile-info-routing.module';
import { PopupModule } from 'src/app/general/features/popup/features/popup.module';


@NgModule({
  declarations: [
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    KeyvalueModule,
    ReactiveFormsModule,
    ProfileInfoRoutingModule,
    PopupModule,
  ]
})
export class ProfileInfoModule { }
