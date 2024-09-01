import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevisionReviewComponent } from './revision-review.component';

const routes: Routes = [
  { 
    path: '', 
    component: RevisionReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionCreateRoutingModule { }
