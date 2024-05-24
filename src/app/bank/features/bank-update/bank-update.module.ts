import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankUpdateComponent } from './bank-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { FileInputModule } from 'src/app/general/ui/file-input/file-input.module';
import { SelectModule } from 'src/app/general/ui/select/select.module';
import { TextAreaModule } from 'src/app/general/ui/text-area/text-area.module';
import { CheckboxModule } from 'src/app/general/ui/checkbox/checkbox.module';



@NgModule({
  declarations: [
    BankUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputModule,
    FileInputModule,
    SelectModule,
    TextAreaModule,
    CheckboxModule
  ],
  exports: [
    BankUpdateComponent
  ]
})
export class BankUpdateModule { }
