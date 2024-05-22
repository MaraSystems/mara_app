import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionListRoutingModule } from './transaction-list-routing.module';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { TransactionItemModule } from '../../ui/project-item/transaction-item.module';
import { PopupModule } from 'src/app/general/features/popup/features/popup.module';
import { TransactionViewModule } from '../transaction-view/transaction-view.module';


@NgModule({
  declarations: [
    TransactionListComponent
  ],
  imports: [
    CommonModule,
    TransactionListRoutingModule,
    TableHeaderModule,
    EmptyModule,
    TransactionItemModule,
    PopupModule,
    TransactionViewModule
  ]
})
export class TransactionListModule { }
