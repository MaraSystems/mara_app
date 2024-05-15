import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/utils/guard/auth.guard';
import { ProfileCreateComponent } from './profile-create.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProfileCreateComponent, 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileCreateRoutingModule { }
