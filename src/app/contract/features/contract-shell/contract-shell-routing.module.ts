import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('../contract-list/contract-list.module').then(
      (m) => m.ContractListModule
    )
  },
  { 
    path: ':contract_id', 
    loadChildren: () => import('../contract-view/contract-view.module').then(
      (m) => m.ContractViewModule
    )
  },
  { 
    path: ':contract_id/deliverables', 
    loadChildren: () => import('../../../contract-deliverable/features/contract-deliverable-shell/contract-deliverable-shell.module').then(
      (m) => m.ContractDeliverableShellModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractShellRoutingModule { }
