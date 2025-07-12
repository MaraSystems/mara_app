import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/utils/guard/auth.guard';
import { NoAuthGuard } from './auth/utils/guard/noauth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/features/home.module').then(
      (m) => m.HomeModule
    )
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.module').then(
      (m) => m.AuthModule
    ),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./client/features/client-create/client-create.module').then(
      (m) => m.ClientCreateModule
    ),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/features/profile-shell/profile-shell.module').then(
      (m) => m.ProfileShellModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    loadChildren: () => import('./client/features/client-shell/client-shell.module').then(
      (m) => m.ClientShellModule
    )
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/features/settings-shell/settings-shell.module').then(
      (m) => m.SettingsShellModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./search/features/search-shell/search-shell.module').then(
      (m) => m.SearchShellModule
    ),
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    loadChildren: () => import('./notfound/notfound.module').then(
      (m) => m.NotfoundModule
    )
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
