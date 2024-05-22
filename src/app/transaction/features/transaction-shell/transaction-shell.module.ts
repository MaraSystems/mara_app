import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionShellRoutingModule } from './transaction-shell-routing.module';
import { TransactionShellComponent } from './transaction-shell.component';
import { TransactionListModule } from '../transaction-list/transaction-list.module';
import { TabsModule } from 'src/app/general/ui/tabs/tabs.module';



@NgModule({
  declarations: [
    TransactionShellComponent
  ],
  imports: [
    CommonModule,
    TransactionShellRoutingModule,
    TransactionListModule,
    TabsModule
  ]
})
export class TransactionShellModule { }
