import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDocumentListComponent } from './project-document-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProjectDocumentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDocumentListRoutingModule { }
