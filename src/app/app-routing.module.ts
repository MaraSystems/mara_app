import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';

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
    )
  },
  { 
    path: 'clients', 
    loadChildren: () => import('./client/features/client-shell/client-shell.module').then(
      (m) => m.ClientShellModule
    )
  },
  { 
    path: '**', 
    loadChildren: () => import('./notfound/notfound.module').then(
      (m) => m.NotfoundModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
