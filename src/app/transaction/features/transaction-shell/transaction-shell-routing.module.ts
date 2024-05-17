import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionShellComponent } from './transaction-shell.component';

const routes: Routes = [
  { 
    path: '', 
    component: TransactionShellComponent
  },
  { 
    path: 'history', 
    loadChildren: () => import('../transaction-list/transaction-list.module').then(
      (m) => m.TransactionListModule
    )
  },
  { 
    path: ':transaction_id', 
    loadChildren: () => import('../transaction-view/transaction-view.module').then(
      (m) => m.TransactionViewModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionShellRoutingModule { }
