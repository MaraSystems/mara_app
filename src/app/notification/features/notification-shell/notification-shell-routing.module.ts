import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('../notification-list/notification-list.module').then(
      (m) => m.NotificationListModule
    )
  },
  { 
    path: ':id', 
    loadChildren: () => import('../notification-view/notification-view.module').then(
      (m) => m.NotificationViewModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationShellRoutingModule { }
