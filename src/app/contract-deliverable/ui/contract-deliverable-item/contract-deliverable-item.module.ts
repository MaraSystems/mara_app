import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDeliverableItemComponent } from './contract-deliverable-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';



@NgModule({
  declarations: [
    ContractDeliverableItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    ContractDeliverableItemComponent
  ]
})
export class ContractDeliverableItemModule { }
