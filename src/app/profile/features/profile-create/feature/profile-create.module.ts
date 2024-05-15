import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreateComponent } from './profile-create.component';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitcherModule } from 'src/app/general/ui/switcher/switcher.module';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { SelectModule } from 'src/app/general/ui/select/select.module';
import { FileInputModule } from 'src/app/general/ui/file-input/file-input.module';
import { ProfileCreateRoutingModule } from './profile-create-routing.module';
import { ProfileCreatePersonalModule } from '../ui/profile-create-personal/profile-create-personal.module';
import { ProfileCreateKinModule } from '../ui/profile-create-kin/profile-create-kin.module';
import { ProfileCreateComplianceModule } from '../ui/profile-create-compliance/profile-create-compliance.module';


@NgModule({
  declarations: [
    ProfileCreateComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    SelectModule,
    FileInputModule,
    ReactiveFormsModule,
    SwitcherModule,
    ProfileCreateRoutingModule,
    ProfileCreatePersonalModule,
    ProfileCreateKinModule,
    ProfileCreateComplianceModule
  ],
  exports: [
    ProfileCreateComponent
  ]
})
export class ProfileCreateModule { }
