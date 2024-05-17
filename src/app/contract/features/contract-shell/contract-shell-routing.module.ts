import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractShellComponent } from './contract-shell.component';

const routes: Routes = [
  { 
    path: '', 
    component: ContractShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractShellRoutingModule { }
