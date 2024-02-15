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
        path: 'kin',
        loadChildren: () => import('../kin/features/kin.module').then(
          (m) => m.KinModule
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
