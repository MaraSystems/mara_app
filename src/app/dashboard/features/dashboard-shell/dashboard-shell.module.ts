import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardShellComponent } from './dashboard-shell.component';
import { DashboardShellRoutingModule } from './dashboard-shell-routing.module';
import { WalletViewModule } from '../../ui/wallet-view/wallet-view.module';


@NgModule({
  declarations: [
    DashboardShellComponent
  ],
  imports: [
    CommonModule,
    DashboardShellRoutingModule,
    WalletViewModule
  ]
})
export class DashboardShellModule { }
