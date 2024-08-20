import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletViewComponent } from './wallet-view.component';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { CommentListModule } from 'src/app/general/features/comment/features/comment-list/comment-list.module';
import { ShareModule } from 'src/app/general/features/share/features/share.module';
import { WalletDebitModule } from '../wallet-debit/wallet-debit.module';
import { WalletCreditModule } from '../wallet-credit/wallet-credit.module';


@NgModule({
  declarations: [
    WalletViewComponent
  ],
  imports: [
    CommonModule,
    PopupModule,
    WalletDebitModule,
    WalletCreditModule
  ],
  exports: [
    WalletViewComponent
  ]
})
export class WalletViewModule { }
