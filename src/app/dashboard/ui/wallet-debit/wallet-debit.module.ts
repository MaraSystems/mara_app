import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletDebitComponent } from './wallet-debit.component';
import { MoneyInputModule } from 'src/app/general/ui/money-input/money-input.module';
import { SelectModule } from 'src/app/general/ui/select/select.module';


@NgModule({
  declarations: [
    WalletDebitComponent
  ],
  imports: [
    CommonModule,
    MoneyInputModule,
    SelectModule
  ],
  exports: [
    WalletDebitComponent
  ]
})
export class WalletDebitModule { }
