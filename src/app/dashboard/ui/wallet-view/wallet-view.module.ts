import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletViewComponent } from './wallet-view.component';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
import { WalletDebitModule } from '../wallet-debit/wallet-debit.module';
import { WalletCreditModule } from '../wallet-credit/wallet-credit.module';
import { ButtonModule } from 'src/app/general/ui/button/button.module';


@NgModule({
  declarations: [
    WalletViewComponent
  ],
  imports: [
    CommonModule,
    PopupModule,
    WalletDebitModule,
    WalletCreditModule,
    ButtonModule
  ],
  exports: [
    WalletViewComponent
  ]
})
export class WalletViewModule { }
