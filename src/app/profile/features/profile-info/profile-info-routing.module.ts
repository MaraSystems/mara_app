import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/utils/guard/auth.guard';
import { ProfileInfoComponent } from './profile-info.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProfileInfoComponent, 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileInfoRoutingModule { }
