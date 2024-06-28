import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractCreateComponent } from './contract-create.component';
import { ContractCreateRoutingModule } from './contract-create-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { FileInputModule } from 'src/app/general/ui/file-input/file-input.module';
import { SelectModule } from 'src/app/general/ui/select/select.module';
import { TextAreaModule } from 'src/app/general/ui/text-area/text-area.module';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { ProjectDeliverableItemModule } from 'src/app/project-deliverable/ui/project-deliverable-item/project-deliverable-item.module';



@NgModule({
  declarations: [
    ContractCreateComponent
  ],
  imports: [
    CommonModule,
    ContractCreateRoutingModule,
    ReactiveFormsModule,
    KeyvalueModule,
    ProjectDeliverableItemModule
  ]
})
export class ContractCreateModule { }
