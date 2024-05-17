import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsShellComponent } from './settings-shell.component';

const routes: Routes = [
  { 
    path: '', 
    component: SettingsShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsShellRoutingModule { }
