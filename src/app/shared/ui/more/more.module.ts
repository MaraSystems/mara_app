import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreComponent } from './more.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MoreComponent
  ]
})
export class MoreModule { }
