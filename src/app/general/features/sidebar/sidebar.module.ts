import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '../../ui/button/button.module';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
