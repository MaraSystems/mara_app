import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractViewComponent } from './contract-view.component';

const routes: Routes = [
  { 
    path: '', 
    component: ContractViewComponent
  },
  // {
  //   path: 'deliverables',
  //   loadChildren: () => import('../../../contract-deliverable/features/contract-deliverable-shell/contract-deliverable-shell.module').then((m) => m.ContractDeliverableShellModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractViewRoutingModule { }
