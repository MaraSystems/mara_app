import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevisionViewComponent } from './revision-view.component';

const routes: Routes = [
  { 
    path: '', 
    component: RevisionViewComponent
  },
  // {
  //   path: 'files',
  //   loadChildren: () => import('../../../revision/features/revision-shell/revision-shell.module').then((m) => m.RevisionShellModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionViewRoutingModule { }
