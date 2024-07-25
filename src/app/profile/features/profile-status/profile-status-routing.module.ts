import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/utils/guard/auth.guard';
import { ProfileStatusComponent } from './profile-status.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProfileStatusComponent, 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileStatusRoutingModule { }
