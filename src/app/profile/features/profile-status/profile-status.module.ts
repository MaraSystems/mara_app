import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileStatusRoutingModule } from './profile-status-routing.module';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
import { SignatureModule } from 'src/app/general/features/signature/signature.module';
import { ProfileStatusComponent } from './profile-status.component';



@NgModule({
  declarations: [
    ProfileStatusComponent
  ],
  imports: [
    CommonModule,
    ProfileStatusRoutingModule,
    PopupModule,
    SignatureModule
  ]
})
export class ProfileStatusModule { }
