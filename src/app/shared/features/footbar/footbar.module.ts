import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootbarComponent } from './footbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FootbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    FootbarComponent
  ]
})
export class FootbarModule { }
