import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDeliverableViewComponent } from './project-deliverable-view.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProjectDeliverableViewComponent
  },
  // {
  //   path: 'files',
  //   loadChildren: () => import('../../../project-deliverable/features/project-deliverable-shell/project-deliverable-shell.module').then((m) => m.ProjectDeliverableShellModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDeliverableViewRoutingModule { }
