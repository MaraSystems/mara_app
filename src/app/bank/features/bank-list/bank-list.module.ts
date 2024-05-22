import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankListComponent } from './bank-list.component';
import { BankListRoutingModule } from './bank-list-routing.module';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';



@NgModule({
  declarations: [
    BankListComponent
  ],
  imports: [
    CommonModule,
    BankListRoutingModule,
    TableHeaderModule,
    EmptyModule
  ]
})
export class BankListModule { }
