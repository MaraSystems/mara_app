import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreateComplianceComponent } from './profile-create-compliance.component';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitcherModule } from 'src/app/general/ui/switcher/switcher.module';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { SelectModule } from 'src/app/general/ui/select/select.module';
import { FileInputModule } from 'src/app/general/ui/file-input/file-input.module';
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
