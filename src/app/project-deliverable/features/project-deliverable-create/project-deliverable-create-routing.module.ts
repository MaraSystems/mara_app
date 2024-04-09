import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDeliverableCreateComponent } from './project-deliverable-create.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProjectDeliverableCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDeliverableCreateRoutingModule { }
