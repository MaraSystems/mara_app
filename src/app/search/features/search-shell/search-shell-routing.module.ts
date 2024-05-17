import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchShellComponent } from './search-shell.component';

const routes: Routes = [
  { 
    path: '', 
    component: SearchShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchShellRoutingModule { }
