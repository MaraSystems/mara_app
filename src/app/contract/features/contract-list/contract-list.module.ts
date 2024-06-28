import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractListComponent } from './contract-list.component';
import { ContractListRoutingModule } from './contract-list-routing.module';
import { ContractItemModule } from '../../ui/contract-item/contract-item.module';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';



@NgModule({
  declarations: [
    ContractListComponent
  ],
  imports: [
    CommonModule,
    ContractListRoutingModule,
    ContractItemModule,
    TableHeaderModule,
    EmptyModule
  ]
})
export class ContractListModule { }
