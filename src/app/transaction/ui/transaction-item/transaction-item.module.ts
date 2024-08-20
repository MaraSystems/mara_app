import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionItemComponent } from './transaction-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
import { TransactionViewModule } from '../../features/transaction-view/transaction-view.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';


@NgModule({
  declarations: [
    TransactionItemComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    PopupModule,
    TransactionViewModule,
    MoreModule
  ],
  exports: [
    TransactionItemComponent
  ]
})
export class TransactionItemModule { }
