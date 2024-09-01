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
    path: ':id', 
    loadChildren: () => import('../revision-view/revision-view.module').then(
      (m) => m.RevisionViewModule
    )
  },
  { 
    path: ':id/review', 
    loadChildren: () => import('../revision-review/revision-review.module').then(
      (m) => m.RevisionReviewModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionShellRoutingModule { }
