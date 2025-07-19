import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/utils/guard/auth.guard';

const routes: Routes = [
  {
      path: '',
      loadChildren: () => import('../user-list/user-list.module').then(
        (m) => m.UserListModule
      ),
      canActivate: [AuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserShellRoutingModule { }
