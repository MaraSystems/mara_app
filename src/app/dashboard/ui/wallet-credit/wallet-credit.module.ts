import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletCreditComponent } from './wallet-credit.component';
import { MoneyInputModule } from 'src/app/general/ui/money-input/money-input.module';


@NgModule({
  declarations: [
    WalletCreditComponent
  ],
  imports: [
    CommonModule,
    MoneyInputModule
  ],
  exports: [
    WalletCreditComponent
  ]
})
export class WalletCreditModule { }
