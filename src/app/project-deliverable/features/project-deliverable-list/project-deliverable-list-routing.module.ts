import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDeliverableListComponent } from './project-deliverable-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProjectDeliverableListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDeliverableListRoutingModule { }
