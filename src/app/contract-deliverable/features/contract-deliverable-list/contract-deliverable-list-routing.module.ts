import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractDeliverableListComponent } from './contract-deliverable-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: ContractDeliverableListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractDeliverableListRoutingModule { }
