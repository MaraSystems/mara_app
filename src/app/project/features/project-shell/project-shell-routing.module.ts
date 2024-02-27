import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('../project-list/project-list.module').then(
      (m) => m.ProjectListModule
    )
  },
  { 
    path: 'create', 
    loadChildren: () => import('../project-create/project-create.module').then(
      (m) => m.ProjectCreateModule
    )
  },
  { 
    path: ':id', 
    loadChildren: () => import('../project-view/project-view.module').then(
      (m) => m.ProjectViewModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectShellRoutingModule { }
