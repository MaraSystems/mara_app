import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/utils/guard/auth.guard';
import { ProfileInterestsComponent } from './profile-interests.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProfileInterestsComponent, 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileInterestsRoutingModule { }
