import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'register', 
    loadChildren: () => import('../client-register/client-register.module').then(
      (m) => m.ClientRegisterModule
    )
  },
  { 
    path: 'profile', 
    loadChildren: () => import('../client-profile/client-profile.module').then(
      (m) => m.ClientProfileModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientShellRoutingModule { }
