import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectViewComponent } from './project-view.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProjectViewComponent
  },
  {
    path: 'deliverables',
    loadChildren: () => import('../../../project-deliverable/features/project-deliverable-shell/project-deliverable-shell.module').then((m) => m.ProjectDeliverableShellModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectViewRoutingModule { }
