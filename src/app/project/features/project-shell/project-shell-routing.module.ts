import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'create', 
    loadChildren: () => import('../project-create/project-create.module').then(
      (m) => m.ProjectCreateModule
    )
  },
  { 
    path: 'list', 
    loadChildren: () => import('../project-list/project-list.module').then(
      (m) => m.ProjectListModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectShellRoutingModule { }
