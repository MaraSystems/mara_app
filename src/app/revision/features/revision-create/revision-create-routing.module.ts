import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevisionCreateComponent } from './revision-create.component';

const routes: Routes = [
  { 
    path: '', 
    component: RevisionCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionCreateRoutingModule { }
