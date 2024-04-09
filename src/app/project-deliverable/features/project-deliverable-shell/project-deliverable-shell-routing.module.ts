import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('../project-deliverable-list/project-deliverable-list.module').then(
      (m) => m.ProjectDeliverableListModule
    )
  },
  { 
    path: 'create', 
    loadChildren: () => import('../project-deliverable-create/project-deliverable-create.module').then(
      (m) => m.ProjectDeliverableCreateModule
    )
  },
  // { 
  //   path: ':id', 
  //   loadChildren: () => import('../project-view/project-view.module').then(
  //     (m) => m.ProjectViewModule
  //   )
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDeliverableShellRoutingModule { }
