import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('../revision-list/revision-list.module').then(
      (m) => m.RevisionListModule
    )
  },
  { 
    path: 'create', 
    loadChildren: () => import('../revision-create/revision-create.module').then(
      (m) => m.RevisionCreateModule
    )
  },
  { 
    path: ':deliverable_id', 
    loadChildren: () => import('../revision-view/revision-view.module').then(
      (m) => m.RevisionViewModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionShellRoutingModule { }
