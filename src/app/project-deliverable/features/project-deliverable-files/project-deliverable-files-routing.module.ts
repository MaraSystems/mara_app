import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDeliverableFilesComponent } from './project-deliverable-files.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProjectDeliverableFilesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDeliverableFilesRoutingModule { }
