import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDeliverableListComponent } from './contract-deliverable-list.component';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { ContractDeliverableItemModule } from '../../ui/contract-deliverable-item/contract-deliverable-item.module';
import { RouterModule } from '@angular/router';
import { ContractDeliverableListRoutingModule } from './contract-deliverable-list-routing.module';



@NgModule({
  declarations: [
    ContractDeliverableListComponent
  ],
  imports: [
    CommonModule,
    TableHeaderModule,
    EmptyModule,
    ContractDeliverableItemModule,
    ContractDeliverableListRoutingModule
  ],
  exports: [
    ContractDeliverableListComponent
  ]
})
export class ContractDeliverableListModule { }
