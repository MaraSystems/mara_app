import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationShellComponent } from './notification-shell.component';

const routes: Routes = [
  { 
    path: '', 
    component: NotificationShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationShellRoutingModule { }
