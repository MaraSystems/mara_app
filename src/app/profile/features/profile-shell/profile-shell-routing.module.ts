import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileShellComponent } from './profile-shell.component';
import { AuthGuard } from 'src/app/auth/utils/guard/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: ProfileShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'info',
        loadChildren: () => import('../profile-info/profile-info.module').then(
          (m) => m.ProfileInfoModule
        )
      },
      {
        path: 'interests',
        loadChildren: () => import('../profile-interests/profile-interests.module').then(
          (m) => m.ProfileInterestsModule
        )
      },
      {
        path: 'status',
        loadChildren: () => import('../profile-status/profile-status.module').then(
          (m) => m.ProfileStatusModule
        )
      },
      {
        path: 'kin',
        loadChildren: () => import('../kin/features/kin.module').then(
          (m) => m.KinModule
        )
      },
      {
        path: 'create',
        loadChildren: () => import('../profile-create/feature/profile-create.module').then(
          (m) => m.ProfileCreateModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileShellRoutingModule { }
