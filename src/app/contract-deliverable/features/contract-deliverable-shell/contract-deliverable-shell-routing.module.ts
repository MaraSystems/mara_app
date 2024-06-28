import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('../contract-deliverable-list/contract-deliverable-list.module').then(
      (m) => m.ContractDeliverableListModule
    )
  },
  { 
    path: ':deliverable_id', 
    loadChildren: () => import('../contract-deliverable-view/contract-deliverable-view.module').then(
      (m) => m.ContractDeliverableViewModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractDeliverableShellRoutingModule { }
