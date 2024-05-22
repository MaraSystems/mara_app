import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/utils/guard/auth.guard';
import { TransactionShellComponent } from './transaction-shell.component';

const routes: Routes = [
  { 
    path: '', 
    component: TransactionShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'history',
        loadChildren: () => import('../transaction-list/transaction-list.module').then(
          (m) => m.TransactionListModule
        )
      },
      {
        path: 'banks',
        loadChildren: () => import('../../../bank/features/bank-list/bank-list.module').then(
          (m) => m.BankListModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionShellRoutingModule { }
