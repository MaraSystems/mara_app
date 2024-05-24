import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardShellComponent } from './dashboard-shell.component';
import { AuthGuard } from 'src/app/auth/utils/guard/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardShellRoutingModule { }
