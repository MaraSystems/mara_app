import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevisionListComponent } from './revision-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: RevisionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionListRoutingModule { }
