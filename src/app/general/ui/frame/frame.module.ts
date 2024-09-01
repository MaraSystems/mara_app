import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame.component';
import { SafePipe } from '../../utils/pipes/safe.pipe';



@NgModule({
  declarations: [
    FrameComponent,
    SafePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FrameComponent
  ]
})
export class FrameModule { }
