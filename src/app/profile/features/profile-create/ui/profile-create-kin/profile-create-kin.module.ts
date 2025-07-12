import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCreateKinComponent } from './profile-create-kin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitcherModule } from 'src/app/general/ui/switcher/switcher.module';
import { TextInputModule } from 'src/app/general/ui/text-input/text-input.module';
import { SelectModule } from 'src/app/general/ui/select/select.module';
import { FileInputModule } from 'src/app/general/ui/file-input/file-input.module';


@NgModule({
  declarations: [
    ProfileCreateKinComponent
  ],
  imports: [
    CommonModule,
    TextInputModule,
    SelectModule,
    FileInputModule,
    ReactiveFormsModule,
    SwitcherModule,
  ],
  exports: [
    ProfileCreateKinComponent
  ]
})
export class ProfileCreateKinModule { }
