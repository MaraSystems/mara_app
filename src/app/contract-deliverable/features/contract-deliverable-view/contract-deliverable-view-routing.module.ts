import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractDeliverableViewComponent } from './contract-deliverable-view.component';

const routes: Routes = [
  { 
    path: '', 
    component: ContractDeliverableViewComponent
  },
  // {
  //   path: 'files',
  //   loadChildren: () => import('../../../contract-deliverable/features/contract-deliverable-shell/contract-deliverable-shell.module').then((m) => m.ContractDeliverableShellModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractDeliverableViewRoutingModule { }
