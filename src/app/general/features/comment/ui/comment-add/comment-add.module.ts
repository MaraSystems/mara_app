import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentAddComponent } from './comment-add.component';
import { InputModule } from 'src/app/general/ui/input/input.module';



@NgModule({
  declarations: [
    CommentAddComponent
  ],
  imports: [
    CommonModule,
    InputModule
  ],
  exports: [
    CommentAddComponent
  ]
})
export class CommentAddModule { }
