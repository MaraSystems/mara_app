import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankListComponent } from './bank-list.component';
import { BankListRoutingModule } from './bank-list-routing.module';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { PopupModule } from 'src/app/general/features/popup/features/popup.module';
import { BankCreateModule } from '../bank-create/bank-create.module';
import { BankItemModule } from '../../ui/bank-item/bank-item.module';
import { BankUpdateModule } from '../bank-update/bank-update.module';



@NgModule({
  declarations: [
    BankListComponent
  ],
  imports: [
    CommonModule,
    BankListRoutingModule,
    TableHeaderModule,
    EmptyModule,
    PopupModule,
    BankCreateModule,
    BankUpdateModule,
    BankItemModule
  ]
})
export class BankListModule { }
