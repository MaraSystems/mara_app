import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProfileComponent } from './client-profile.component';
import { AuthGuard } from 'src/app/auth/utils/guard/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: ClientProfileComponent, 
    children: [
      { 
        path: 'info', 
        loadChildren: () => import('../client-info/client-info.module').then(
          (m) => m.ClientInfoModule
        ),
        data: {}
      },
      { 
        path: 'interests', 
        loadChildren: () => import('../client-interest/client-interest.module').then(
          (m) => m.ClientInterestModule
        ),
        data: {}
      },
      { 
        path: 'kin', 
        loadChildren: () => import('../client-kin/client-kin.module').then(
          (m) => m.ClientKinModule
        ),
        data: {}
      },
      { 
        path: 'status', 
        loadChildren: () => import('../client-status/client-status.module').then(
          (m) => m.ClientStatusModule
        ),
        data: {}
      },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProfileRoutingModule { }
