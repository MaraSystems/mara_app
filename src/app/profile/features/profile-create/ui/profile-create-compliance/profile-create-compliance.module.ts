import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreateComplianceComponent } from './profile-create-compliance.component';
import { ProfileCreateComplianceItemModule } from '../profile-create-compliance-item/profile-create-compliance-item.module';


@NgModule({
  declarations: [
    ProfileCreateComplianceComponent
  ],
  imports: [
    CommonModule,
    ProfileCreateComplianceItemModule
  ],
  exports: [
    ProfileCreateComplianceComponent
  ]
})
export class ProfileCreateComplianceModule { }
