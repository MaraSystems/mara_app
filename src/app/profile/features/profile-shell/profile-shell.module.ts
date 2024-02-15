import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileShellComponent } from './profile-shell.component';
import { ProfileShellRoutingModule } from './profile-shell-routing.module';
import { TabsModule } from 'src/app/shared/ui/tabs/tabs.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProfileShellComponent
  ],
  imports: [
    CommonModule,
    ProfileShellRoutingModule,
    TabsModule,
    RouterModule
  ]
})
export class ProfileShellModule { }
